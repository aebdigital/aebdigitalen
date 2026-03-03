import { NextRequest, NextResponse } from 'next/server';

// Utility function to verify Cloudflare Turnstile token
async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not configured.');
    // In a production scenario, you might want to return false here
    // to prevent forms from being submitted without proper CAPTCHA.
    // For development, we might allow it to proceed.
    return true; // Allowing submission if key is missing (fail-open)
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip) {
      formData.append('remoteip', ip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      // headers:
      //   {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
    });

    const data = await response.json();

    if (!data.success) {
      console.warn('Turnstile verification failed:', data);
    }

    return data.success;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false; // Fail closed in case of network error to Cloudflare
  }
}

// Utility to detect high-entropy gibberish (common in bot strings like 'JMwzyzngCTXj')
function isGibberish(text: string): boolean {
  if (!text || text.length < 5) return false;

  // High consonant to vowel ratio or long strings without vowels
  const vowels = text.match(/[aeiouyáéíóúýäô]/gi) || [];
  const consonants = text.match(/[bcdfghjklmnpqrstvwxzščťžďň]/gi) || [];

  if (consonants.length > 5 && vowels.length === 0) return true;
  if (consonants.length / (vowels.length || 1) > 5 && text.length > 10) return true;

  // Check for very long strings of characters with no spaces (common in gibberish)
  const words = text.split(/\s+/);
  for (const word of words) {
    if (word.length > 15 && !word.includes('@') && !word.includes('http')) {
      return true;
    }
  }

  return false;
}

// Simple in-memory rate limiting wrappers (will reset on Vercel instance reboot, but still helpful)
const ipRateLimit = new Map<string, { count: number; lastReset: number }>();
const emailRateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = 3; // Max submissions per hour per IP/Email
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(map: Map<string, { count: number; lastReset: number }>, key: string): boolean {
  const now = Date.now();
  const record = map.get(key);

  if (!record) {
    map.set(key, { count: 1, lastReset: now });
    return true;
  }

  if (now - record.lastReset > RATE_LIMIT_WINDOW) {
    map.set(key, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  // Set CORS headers for Vercel deployment if needed, or rely on Next.js default behavior
  const headers = {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*', // Consider restricting to specific origins
    // 'Access-Control-Allow-Methods': 'POST, OPTIONS',
    // 'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const data = await request.json();
    const { name, email, message, turnstileToken, website, startTime } = data;

    // Fast submission block (bots typically submit instantly)
    if (startTime && Date.now() - startTime < 3000) {
      console.warn(`Fast submission detected. Bot suspected.`);
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
        },
        { status: 200, headers }
      );
    }

    // Gibberish Detection (Blocks random strings like 'JMwzyzngCTXj')
    if (isGibberish(name) || isGibberish(message)) {
      console.warn(`Gibberish detected in Name or Message. Bot suspected. Name: ${name}`);
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
        },
        { status: 200, headers }
      );
    }

    // Honeypot check: If the hidden field 'website' is filled, it's a bot.
    if (website && website.length > 0) {
      console.warn(`Honeypot triggered. Bot detected. IP: ${request.headers.get('x-forwarded-for') || request.headers.get('client-ip')}`);
      // Return a fake success response to fool the bot
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
        },
        { status: 200, headers }
      );
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('client-ip') || 'Unknown IP';

    // Rate Limiting Check
    if (!checkRateLimit(ipRateLimit, ip) || !checkRateLimit(emailRateLimit, email)) {
      console.warn(`Rate limit exceeded for IP: ${ip} or Email: ${email}`);
      return NextResponse.json(
        {
          error: 'You have exceeded the submission limit. Please try again later.',
          details: 'Rate limit exceeded.',
        },
        { status: 429, headers }
      );
    }

    // Verify Turnstile Token
    if (!turnstileToken) {
      return NextResponse.json(
        {
          error: 'CAPTCHA verification missing.',
          details: 'Turnstile token is missing.',
        },
        { status: 400, headers }
      );
    }
    const isHuman = await verifyTurnstile(turnstileToken, ip);
    if (!isHuman) {
      return NextResponse.json(
        {
          error: 'CAPTCHA verification failed. Please try again.',
          details: 'Turnstile verification failed.',
        },
        { status: 400, headers }
      );
    }

    // Extract phone, budget, and subject from message if included
    let cleanMessage = message;
    let phone = '';
    let budget = '';
    let subject = '';

    const phoneMatch = message.match(/Phone:\s*(.+)/);
    const budgetMatch = message.match(/Budget:\s*(.+)/);
    const subjectMatch = message.match(/Project Type:\s*(.+)/);

    if (phoneMatch) phone = phoneMatch[1].trim();
    if (budgetMatch) budget = budgetMatch[1].trim();
    if (subjectMatch) subject = subjectMatch[1].trim();

    cleanMessage = message
      .replace(/\n\nPhone:.*/, '')
      .replace(/Phone:.*\n?/, '')
      .replace(/Budget:.*\n?/, '')
      .replace(/Project Type:.*\n?/, '')
      .trim();

    // Validate required fields
    if (!name || !email || !cleanMessage) {
      return NextResponse.json(
        {
          error: 'All fields are required.',
          details: 'Name, email, and message are required fields.',
        },
        { status: 400, headers }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: 'Invalid email address.',
          details: 'Invalid email format.',
        },
        { status: 400, headers }
      );
    }

    const SMTP2GO_API_KEY = process.env.SMTP2GO_API_KEY;
    const SMTP2GO_FROM_EMAIL = process.env.SMTP2GO_FROM_EMAIL;
    const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || process.env.SMTP2GO_FROM_EMAIL;

    if (!SMTP2GO_API_KEY || !SMTP2GO_FROM_EMAIL || !BUSINESS_EMAIL) {
      console.error('SMTP2GO environment variables not configured.');
      return NextResponse.json(
        {
          error: 'Server configuration error. Please contact the administrator.',
          details: 'Email service environment variables are not set.',
        },
        { status: 500, headers }
      );
    }

    const emailPayload = {
      api_key: SMTP2GO_API_KEY,
      to: [BUSINESS_EMAIL],
      sender: SMTP2GO_FROM_EMAIL,
      subject: `New message from contact form - ${name}`,
      text_body: `
New message from AEB Digital contact form

From: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}
${subject ? `Project Type: ${subject}\n` : ''}
${budget ? `Budget: ${budget}\n` : ''}

Message:
${message}

---
Sent from: ${request.headers.get('referer') || 'Unknown'}
IP address: ${request.headers.get('x-forwarded-for') || request.headers.get('client-ip') || 'Unknown'}
Time: ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Bratislava' })}
      `,
      html_body: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #ffffff;
      background-color: #16171A;
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #16171A;
      padding: 40px 20px;
    }
    .heading {
      color: #00997d;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 30px;
      text-align: center;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    }
    .form-container {
      background-color: #212327;
      padding: 40px;
      border-radius: 20px;
      border: 0.5px solid #555555;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .label {
      display: block;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 8px;
      font-size: 12px;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    }
    .value {
      background-color: #383a3c;
      padding: 12px 16px;
      border-radius: 10px;
      color: #ffffff;
      border: 0.5px solid #555555;
      font-size: 14px;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    }
    .value a {
      color: #00997d;
      text-decoration: none;
    }
    .message-box {
      background-color: #383a3c;
      padding: 15px;
      border-radius: 10px;
      color: #ffffff;
      border: 0.5px solid #555555;
      min-height: 100px;
      white-space: pre-wrap;
      font-size: 14px;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #383a3c;
      font-size: 12px;
      color: #888888;
      text-align: center;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 class="heading">New message from contact form</h2>
    <div class="form-container">
      <div class="form-group">
        <div class="label">Name *</div>
        <div class="value">${name}</div>
      </div>
      <div class="form-group">
        <div class="label">Email *</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      ${phone ? `<div class="form-group">
        <div class="label">Phone</div>
        <div class="value">${phone}</div>
      </div>` : ''}
      ${subject ? `<div class="form-group">
        <div class="label">Project Type *</div>
        <div class="value">${subject}</div>
      </div>` : ''}
      ${budget ? `<div class="form-group">
        <div class="label">Budget</div>
        <div class="value">${budget}</div>
      </div>` : ''}
      <div class="form-group">
        <div class="label">Message *</div>
        <div class="message-box">${cleanMessage.replace(/\n/g, '<br>')}</div>
      </div>
      <div class="footer">
        <p>Sent from: ${request.headers.get('referer') || 'Unknown'}<br>
        IP: ${request.headers.get('x-forwarded-for') || request.headers.get('client-ip') || 'Unknown'}<br>
        ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Bratislava' })}</p>
      </div>
    </div>
  </div>
</body>
</html>
      `
    };

    const smtp2goResponse = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Smtp2go-Api-Key': SMTP2GO_API_KEY,
      },
      body: JSON.stringify(emailPayload),
    });

    const result = await smtp2goResponse.json();

    if (smtp2goResponse.ok && result.data && result.data.succeeded > 0) {
      console.log('Email sent successfully:', result);
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
          details: 'Message sent successfully via SMTP2GO.',
        },
        { status: 200, headers }
      );
    } else {
      console.error('SMTP2GO API error:', result);
      return NextResponse.json(
        {
          error: 'Error sending email.',
          details: result.data?.error || 'Failed to send email via SMTP2GO.',
        },
        { status: 500, headers }
      );
    }
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while processing your message.',
        details: error.message || 'Internal server error.',
      },
      { status: 500, headers }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  const headers = {
    'Access-Control-Allow-Origin': '*', // Adjust as needed for your deployment
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  return new NextResponse(null, { status: 204, headers });
}
