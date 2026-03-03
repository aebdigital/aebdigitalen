import Image from 'next/image';

export interface BlogPostData {
  slug: string;
  metadata: {
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
    ogImage: string;
    ogImageAlt: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    category: string;
  };
  content: string; // HTML content
  recommendations?: { slug: string; title: string; imageSrc: string; imageAlt: string; date: string; author: string; }[];
}

const allBlogPosts: BlogPostData[] = [
  {
    slug: "ecommerce-trends-2025",
    metadata: {
      title: "E-commerce Trends for 2025 | AEB Digital Blog",
      description: "Discover key e-commerce trends for 2025: mobile commerce, AI personalization, social commerce, sustainability, AR/VR shopping, and omnichannel strategies.",
      keywords: "e-commerce trends 2025, online store, mobile commerce, AI personalization, social commerce, sustainability, AR shopping, omnichannel",
      canonicalUrl: "https://aebdigital.com/blog/ecommerce-trends-2025",
      ogImage: "/sources/techstack/shopify-bag-icon-symbol-logo-701751695132537nenecmhs0u-removebg-preview-e1750440978862.webp",
      ogImageAlt: "E-commerce Trends for 2025",
      author: "AEB Digital",
      datePublished: "January 8, 2025",
      category: "E-commerce",
    },
    content: `
      <a href="/blog" class="back-to-blog" style="display: inline-block; margin-bottom: 2rem; color: var(--accent-teal); text-decoration: none; font-weight: 600;">
          &larr; Back to blog
      </a>

      <p>The e-commerce sector is experiencing the fastest growth in history. The COVID-19 pandemic accelerated digital transformation by 5-10 years, and consumers have formed new shopping habits. 2025 brings a revolution in how we shop, sell, and interact in the digital environment.</p>

      <div class="stat-box" style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 1rem; margin: 2rem 0; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
          <span class="stat-number" style="display: block; font-size: 3rem; font-weight: 800; color: var(--accent-teal); margin-bottom: 0.5rem;">$6.2T</span>
          <p style="margin: 0; color: #a0aec0;">The global e-commerce market will reach a value of <strong>$6.2 trillion</strong> in 2025, representing 23% of total retail.</p>
      </div>

      <p>In this comprehensive guide, you will learn about the key trends that will define the future of online commerce, and practical tips on how to implement them into your e-commerce strategy.</p>

      <div class="trend-card" style="background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 1rem; margin: 2rem 0; border-left: 4px solid var(--accent-teal);">
          <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">1. Mobile Commerce (M-Commerce) Revolution</h3>
          <p>Mobile commerce is no longer just a trend - it's a new reality. In 2025, mobile purchases are expected to account for more than 54% of all e-commerce transactions.</p>
          
          <h4 style="color: white; margin-top: 1.5rem; margin-bottom: 0.5rem;">Key factors for m-commerce success:</h4>
          <ul style="list-style-type: disc; padding-left: 1.5rem; color: #a0aec0;">
              <li><strong>Progressive Web Apps (PWA):</strong> App-like experience without downloading</li>
              <li><strong>One-click purchasing:</strong> Minimizing steps in the checkout process</li>
              <li><strong>Mobile payment integration:</strong> Apple Pay, Google Pay, PayPal</li>
              <li><strong>Voice commerce:</strong> Purchases via voice assistants</li>
              <li><strong>Visual search:</strong> Product search using a camera</li>
          </ul>

          <p style="margin-top: 1rem;"><strong>Implementation:</strong> Prioritize mobile-first design, optimize loading speed, and implement touch-friendly navigation with large buttons.</p>
      </div>

      <div class="trend-card" style="background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 1rem; margin: 2rem 0; border-left: 4px solid var(--accent-teal);">
          <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">2. AI-Powered Personalization</h3>
          <p>Artificial intelligence is transforming how e-commerce sites interact with customers. Personalization is becoming a key differentiator.</p>
          
          <h4 style="color: white; margin-top: 1.5rem; margin-bottom: 0.5rem;">AI applications in e-commerce:</h4>
          <ul style="list-style-type: disc; padding-left: 1.5rem; color: #a0aec0;">
              <li><strong>Predictive analytics:</strong> Predicting shopping behavior</li>
              <li><strong>Dynamic pricing:</strong> Automatic price adjustment</li>
              <li><strong>Chatbots and virtual assistants:</strong> 24/7 customer service</li>
              <li><strong>Product recommendations:</strong> AI-driven product recommendations</li>
              <li><strong>Inventory management:</strong> Intelligent inventory management</li>
              <li><strong>Fraud detection:</strong> Automatic fraud detection</li>
          </ul>

          <div class="stat-box" style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 0.5rem; margin-top: 1.5rem; text-align: center;">
              <span class="stat-number" style="display: block; font-size: 2.5rem; font-weight: 800; color: var(--accent-teal);">35%</span>
              <p style="margin: 0; color: #a0aec0;">of Amazon's revenue comes from AI-powered product recommendations</p>
          </div>
      </div>

      <div class="trend-card" style="background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 1rem; margin: 2rem 0; border-left: 4px solid var(--accent-teal);">
          <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">3. Social Commerce Boom</h3>
          <p>Social media is transforming from marketing channels into sales platforms. Social commerce combines social media with e-commerce functionality.</p>
          
          <h4 style="color: white; margin-top: 1.5rem; margin-bottom: 0.5rem;">Platforms and features:</h4>
          <ul style="list-style-type: disc; padding-left: 1.5rem; color: #a0aec0;">
              <li><strong>Instagram Shopping:</strong> Product tags and Shopping ads</li>
              <li><strong>Facebook Shops:</strong> Customizable online stores</li>
              <li><strong>TikTok Shopping:</strong> In-app purchasing via video content</li>
              <li><strong>Pinterest Shopping:</strong> Product Rich Pins and Try-on features</li>
              <li><strong>YouTube Shopping:</strong> Product shelves in videos</li>
          </ul>
      </div>

      <div class="trend-card" style="background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 1rem; margin: 2rem 0; border-left: 4px solid var(--accent-teal);">
          <h3 style="color: white; font-size: 1.5rem; margin-bottom: 1rem;">4. Sustainable E-commerce</h3>
          <p>Sustainability is becoming a key factor in purchasing decisions. Gen Z and Millennials are willing to pay more for environmentally responsible products.</p>
          
          <h4 style="color: white; margin-top: 1.5rem; margin-bottom: 0.5rem;">Green e-commerce initiatives:</h4>
          <ul style="list-style-type: disc; padding-left: 1.5rem; color: #a0aec0;">
              <li><strong>Carbon-neutral shipping:</strong> Offsetting carbon footprint</li>
              <li><strong>Sustainable packaging:</strong> Biodegradable and recyclable packaging</li>
              <li><strong>Circular economy:</strong> Refurbished and second-hand products</li>
              <li><strong>Local sourcing:</strong> Supporting local suppliers</li>
          </ul>
      </div>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">Conclusion: The Future is Now</h2>
      <p>E-commerce trends of 2025 are not just technological novelties - they are a reflection of changing consumer expectations and behavior. Successful e-commerce businesses will be those that can quickly adapt to new technologies and focus on creating an exceptional customer experience.</p>

      <p><strong>Want to be part of the e-commerce revolution?</strong> Our team at AEB Digital helps brands adapt to new trends and build future-ready e-commerce platforms. <a href="/contact" style="color: var(--accent-teal); text-decoration: underline;">Contact us</a> for a consultation on your e-commerce strategy.</p>
    `
  },
  {
    slug: "javascript-techniques-2025",
    metadata: {
      title: "Modern JavaScript Techniques for Developers in 2025 | AEB Digital Blog",
      description: "Discover the latest JavaScript techniques and best practices for 2025. ES2024 features, async/await patterns, TypeScript, performance optimization, and modern frameworks.",
      keywords: "JavaScript 2025, ES2024, async await, TypeScript, JavaScript performance, modern JavaScript, web development, frontend techniques, JavaScript best practices",
      canonicalUrl: "https://aebdigital.com/blog/javascript-techniques-2025",
      ogImage: "/sources/techstack/JavaScript-Logo-scaled-e1750439290173.webp",
      ogImageAlt: "Modern JavaScript Techniques for Developers in 2025",
      author: "AEB Digital",
      datePublished: "January 5, 2025",
      category: "Technology",
    },
    content: `
      <a href="/blog" class="back-to-blog" style="display: inline-block; margin-bottom: 2rem; color: var(--accent-teal); text-decoration: none; font-weight: 600;">
          &larr; Back to blog
      </a>

      <p class="lead" style="font-size: 1.25rem; font-weight: 500; margin-bottom: 2rem;">JavaScript continues its evolution, and 2025 brings new possibilities that are changing the way we develop web applications. From new ES2024 features to advanced asynchronous patterns - check out the most significant trends and techniques.</p>
      
      <p>Modern JavaScript development requires constant learning and adaptation to new technologies. In this article, we will go through the most important techniques every JavaScript developer should know in 2025.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">1. ES2024 New Features</h2>
      
      <h3 style="color: white; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Array.fromAsync()</h3>
      <p>A new method that allows creating an array from an asynchronous iterator:</p>
      <pre style="background: #1a1a1a; padding: 1.5rem; border-radius: 0.5rem; overflow-x: auto; margin: 1.5rem 0; border: 1px solid #333;"><code style="color: #e2e8f0; font-family: monospace;">const asyncIterable = {
async *[Symbol.asyncIterator]() {
  for (let i = 0; i < 3; i++) {
    yield Promise.resolve(i);
  }
}
};

(async () => {
const array = await Array.fromAsync(asyncIterable);
console.log(array); // [0, 1, 2]
})();</code></pre>
      
      <h3 style="color: white; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Object.groupBy() and Map.groupBy()</h3>
      <p>Efficient grouping of objects:</p>
      <pre style="background: #1a1a1a; padding: 1.5rem; border-radius: 0.5rem; overflow-x: auto; margin: 1.5rem 0; border: 1px solid #333;"><code style="color: #e2e8f0; font-family: monospace;">const products = [
{ category: 'electronics', name: 'laptop' },
{ category: 'books', name: 'javascript guide' },
{ category: 'electronics', name: 'smartphone' }
];

const grouped = Object.groupBy(products, item => item.category);
// { electronics: [...], books: [...] }</code></pre>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">2. Advanced Asynchronous Patterns</h2>
      
      <h3 style="color: white; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Top-level await</h3>
      <p>Using await at the top level of modules:</p>
      <pre style="background: #1a1a1a; padding: 1.5rem; border-radius: 0.5rem; overflow-x: auto; margin: 1.5rem 0; border: 1px solid #333;"><code style="color: #e2e8f0; font-family: monospace;">// config.js
const response = await fetch('/api/config');
export const config = await response.json();

// main.js
import { config } from './config.js';
console.log(config); // Ready</code></pre>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">3. Performance Optimization</h2>
      
      <h3 style="color: white; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Web Workers for Heavy Operations</h3>
      <p>Using Web Workers for computationally intensive tasks:</p>
      <pre style="background: #1a1a1a; padding: 1.5rem; border-radius: 0.5rem; overflow-x: auto; margin: 1.5rem 0; border: 1px solid #333;"><code style="color: #e2e8f0; font-family: monospace;">// worker.js
self.onmessage = function(e) {
const { numbers } = e.data;
const result = numbers.reduce((sum, num) => sum + num, 0);
self.postMessage(result);
};

// main.js
const worker = new Worker('worker.js');
worker.postMessage({ numbers: [1, 2, 3, 4, 5] });
worker.onmessage = (e) => console.log('Result:', e.data);</code></pre>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">4. TypeScript Integration</h2>
      <p>TypeScript has become the standard. In 2025, its knowledge is essential.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">Conclusion</h2>
      
      <p>The JavaScript ecosystem is constantly evolving, and 2025 brings many interesting possibilities. The key to success is constant learning and adaptation.</p>
      
      <div class="tip-box" style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 1rem; margin: 2rem 0; border-left: 4px solid #ecc94b;">
          <h3 style="color: #ecc94b; margin-top: 0; margin-bottom: 1rem;">💡 Expert Tip</h3>
          <p style="margin: 0;">Don't start everything at once. Choose 2-3 techniques that are most relevant to your project and implement them gradually.</p>
      </div>

      <p><strong>Need help with modern JavaScript projects?</strong> Our team of experts will help you. <a href="/contact" style="color: var(--accent-teal); text-decoration: underline;">Contact us</a>.</p>
    `
  },
  {
    slug: "react-trends-2025",
    metadata: {
      title: "Top 10 React Trends for 2025 | AEB Digital Blog",
      description: "Discover the most significant React trends for 2025. Server Components, Concurrent Rendering, React 19, and other news that will change web application development.",
      keywords: "React 2025, React trends, Server Components, React 19, Concurrent Rendering, Next.js 15, React hooks, frontend development",
      canonicalUrl: "https://aebdigital.com/blog/react-trends-2025",
      ogImage: "/sources/techstack/React-icon.svg.webp",
      ogImageAlt: "Top 10 React Trends for 2025",
      author: "AEB Digital",
      datePublished: "January 15, 2025",
      category: "Technology",
    },
    content: `
      <a href="/blog" class="back-to-blog" style="display: inline-block; margin-bottom: 2rem; color: var(--accent-teal); text-decoration: none; font-weight: 600;">
          &larr; Back to blog
      </a>

      <p>The React ecosystem is constantly evolving, and 2025 brings a lot of exciting news. As developers, it is important to stay updated with the latest trends that can significantly influence how we build modern web applications.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">1. React Server Components (RSC)</h2>
      <p>Server Components represent a revolutionary approach to rendering React components. They allow running components on the server, leading to faster loading and smaller bundle sizes.</p>
      
      <div class="code-block" style="background: #1a1a1a; padding: 1.5rem; border-radius: 0.5rem; overflow-x: auto; margin: 1.5rem 0; border: 1px solid #333;">
<pre><code style="color: #e2e8f0; font-family: monospace;">// Server Component Example
async function BlogPost({ id }) {
const post = await fetch(\"/api/posts/\${id}\");
return <article>{post.content}</article>;
}</code></pre>
      </div>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">2. Concurrent Rendering</h2>
      <p>Concurrent features in React allow interrupting and resuming rendering based on task priority. This means smoother user interfaces and better responsiveness.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">3. React 19 News</h2>
      <p>React 19 brings a lot of improvements:</p>
      <ul style="list-style-type: disc; padding-left: 1.5rem; color: #a0aec0;">
          <li>New hooks like <code>use()</code> for asynchronous operations</li>
          <li>Improved error boundaries</li>
          <li>Performance optimizations and smaller library size</li>
          <li>Better support for TypeScript</li>
      </ul>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">4. Next.js 15 and App Router</h2>
      <p>App Router in Next.js 15 brings new possibilities for routing and layouts. It uses React Server Components and brings better developer experience.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">5. State Management Evolution</h2>
      <p>Traditional state management libraries are evolving towards simpler APIs and better integration with React 18+ features. Zustand and Jotai are gaining popularity.</p>

      <h3 style="color: white; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Conclusion</h3>
      <p>The year 2025 will be a breakthrough for the React ecosystem. Server Components, Concurrent Rendering, and new tools will change the way we think about frontend development. We recommend gradually experimenting with these technologies in your projects.</p>

      <p><strong>Need help modernizing your React application?</strong> Our team at AEB Digital has experience with the latest React technologies. <a href="/contact" style="color: var(--accent-teal); text-decoration: underline;">Contact us</a> for a free consultation.</p>
    `
  },
  {
    slug: "seo-strategy-2025",
    metadata: {
      title: "5 Steps to a Successful SEO Strategy in 2025 | AEB Digital Blog",
      description: "Complete guide for SEO strategy in 2025. Keyword research, technical SEO, content strategy, Core Web Vitals, and analytics. Practical tips from experts.",
      keywords: "SEO strategy 2025, keyword research, technical SEO, content marketing, Google algorithm, Core Web Vitals, SEO audit, search engines",
      canonicalUrl: "https://aebdigital.com/blog/seo-strategy-2025",
      ogImage: "/sources/techstack/1f4ac.svg",
      ogImageAlt: "5 Steps to a Successful SEO Strategy in 2025",
      author: "AEB Digital",
      datePublished: "January 10, 2025",
      category: "Marketing",
    },
    content: `
      <a href="/blog" class="back-to-blog" style="display: inline-block; margin-bottom: 2rem; color: var(--accent-teal); text-decoration: none; font-weight: 600;">
          &larr; Back to blog
      </a>

      <p>In 2025, SEO strategy is becoming even more complex and important than ever before. Google's algorithm is constantly evolving, placing increasing emphasis on user experience, quality content, and technical aspects of websites.</p>

      <div class="seo-tip" style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 1rem; margin: 2rem 0; border-left: 4px solid #48bb78;">
          <h4 style="color: #48bb78; margin-top: 0; margin-bottom: 1rem;">💡 Why is SEO still important?</h4>
          <p style="margin: 0;">93% of all online experiences start in a search engine. Sites in the first position in Google get an average of 28.5% of all clicks.</p>
      </div>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;"><span class="step-number" style="display: inline-block; width: 40px; height: 40px; background: var(--accent-teal); color: white; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 15px; font-size: 1.2rem;">1</span>SEO Audit and Analysis</h2>
      <p>Before any optimization, you must understand where you currently stand. A complete SEO audit will reveal the strengths, problems, and opportunities of your website.</p>

      <h3 style="color: white; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Technical Audit</h3>
      <p>Technical SEO is the foundation of everything. If your site is not technically sound, other optimizations will not be effective.</p>

      <ul style="list-style-type: disc; padding-left: 1.5rem; color: #a0aec0;">
          <li><strong>Core Web Vitals:</strong> Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS)</li>
          <li><strong>Loading speed:</strong> Goal under 3 seconds for desktop, under 2 seconds for mobile</li>
          <li><strong>Mobile-friendliness:</strong> Responsive design and mobile usability</li>
          <li><strong>HTTPS:</strong> Security certificates are standard</li>
      </ul>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;"><span class="step-number" style="display: inline-block; width: 40px; height: 40px; background: var(--accent-teal); color: white; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 15px; font-size: 1.2rem;">2</span>Keyword Research and Strategy</h2>
      <p>Keyword research in 2025 is not just about finding keywords with high search volume. It is about understanding search intent and the user journey of your target audience.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;"><span class="step-number" style="display: inline-block; width: 40px; height: 40px; background: var(--accent-teal); color: white; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 15px; font-size: 1.2rem;">3</span>On-Page SEO Optimization</h2>
      <p>On-page SEO in 2025 is about creating content that not only contains the right keywords but actually helps users solve their problems.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;"><span class="step-number" style="display: inline-block; width: 40px; height: 40px; background: var(--accent-teal); color: white; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 15px; font-size: 1.2rem;">4</span>Technical SEO and Core Web Vitals</h2>
      <p>In 2025, technical aspects of SEO are critical for success. Google officially uses Page Experience as a ranking factor.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">Conclusion</h2>
      <p>SEO strategy for 2025 requires a holistic approach that combines technical excellence, quality content, and strong off-page signals.</p>

      <p><strong>Need help implementing an SEO strategy?</strong> Our team at AEB Digital has experience with complex SEO projects. <a href="/contact" style="color: var(--accent-teal); text-decoration: underline;">Contact us</a> for a free SEO audit and consultation.</p>
    `
  },
  {
    slug: "ux-design-guide",
    metadata: {
      title: "How to Create User-Friendly Design - Complete UX/UI Guide | AEB Digital",
      description: "Complete guide to UX/UI design. Learn the basics of user experience, wireframing, prototyping, and accessibility. Practical tips for better user experience.",
      keywords: "UX design, UI design, user experience, wireframing, prototyping, accessibility, user journey, design principles, UX research",
      canonicalUrl: "https://aebdigital.com/blog/ux-design-guide",
      ogImage: "/sources/techstack/apps-figma-icon-2048x2048-ctjj5ab7.webp",
      ogImageAlt: "How to Create User-Friendly Design",
      author: "AEB Digital",
      datePublished: "January 12, 2025",
      category: "Design",
    },
    content: `
      <a href="/blog" class="back-to-blog" style="display: inline-block; margin-bottom: 2rem; color: var(--accent-teal); text-decoration: none; font-weight: 600;">
          &larr; Back to blog
      </a>

      <p>In today's digital era, user experience (UX) is a decisive factor in the success of any website or application. Good UX design can increase conversions, improve user satisfaction, and build a strong brand.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">What is UX design and why is it important?</h2>
      <p>User Experience (UX) design is the process of designing products that provide meaningful and relevant experiences to users. It involves the entire process of acquiring and integrating the product, including aspects of branding, design, usability, and functionality.</p>

      <div class="highlight-box" style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 1rem; margin: 2rem 0; border: 1px solid rgba(255,255,255,0.1);">
          <h4 style="color: white; margin-top: 0; margin-bottom: 1rem;">Key statistics about UX:</h4>
          <ul style="list-style-type: disc; padding-left: 1.5rem; color: #a0aec0;">
              <li>88% of users do not return to a website with bad UX</li>
              <li>Every euro invested in UX brings a return of 100 euros</li>
              <li>94% of first impressions are related to design</li>
          </ul>
      </div>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">Basic principles of UX design</h2>
      
      <h3 style="color: white; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">1. The user comes first</h3>
      <p>Every design decision should be guided by the needs and expectations of users.</p>

      <h3 style="color: white; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">2. Consistency is key</h3>
      <p>Consistent design creates a predictable experience.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">UX design process step by step</h2>

      <div class="ux-process-step" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.02); border-radius: 0.5rem;">
          <h4 style="color: var(--accent-teal); font-size: 1.25rem; margin-top: 0;">1. Research and user analysis</h4>
          <p style="margin-bottom: 0;">Before any designing, you must understand your users. Create user personas, analyze the user journey, and identify pain points.</p>
      </div>

      <div class="ux-process-step" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.02); border-radius: 0.5rem;">
          <h4 style="color: var(--accent-teal); font-size: 1.25rem; margin-top: 0;">2. Information architecture</h4>
          <p style="margin-bottom: 0;">Organize content and functionalities in a logical way.</p>
      </div>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">Conclusion</h2>
      <p>User-friendly design is not a luxury - it is a necessity. In a competitive digital environment, good UX can decide the success or failure of your product.</p>

      <p><strong>Need help with the UX design of your website?</strong> Our team at AEB Digital has extensive experience. <a href="/kontakt" style="color: var(--accent-teal); text-decoration: underline;">Contact us</a> for a free UX audit of your site.</p>
    `
  },
  {
    slug: "web-speed-optimization",
    metadata: {
      title: "How to Optimize Website Loading Speed in 2025 | AEB Digital Blog",
      description: "Complete guide to web performance optimization. Core Web Vitals, lazy loading, CDN, image optimization, and advanced techniques for a faster web.",
      keywords: "web optimization, loading speed, Core Web Vitals, lazy loading, CDN, image optimization, web performance, PageSpeed Insights, LCP, FID, CLS",
      canonicalUrl: "https://aebdigital.com/blog/web-speed-optimization",
      ogImage: "/sources/techstack/HTML5_logo_and_wordmark.svg.webp",
      ogImageAlt: "How to Optimize Website Loading Speed in 2025",
      author: "AEB Digital",
      datePublished: "January 3, 2025",
      category: "Development",
    },
    content: `
      <a href="/blog" class="back-to-blog" style="display: inline-block; margin-bottom: 2rem; color: var(--accent-teal); text-decoration: none; font-weight: 600;">
          &larr; Back to blog
      </a>

      <p class="lead" style="font-size: 1.25rem; font-weight: 500; margin-bottom: 2rem;">Website loading speed is a critical success factor today. Users leave sites that load longer than 3 seconds, and Google penalizes slow sites in search results.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">1. Core Web Vitals - the basis of optimization</h2>
      <p>Google Core Web Vitals are three key metrics that measure user experience:</p>
      
      <h3 style="color: white; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Largest Contentful Paint (LCP)</h3>
      <ul style="list-style-type: disc; padding-left: 1.5rem; color: #a0aec0;">
          <li><strong>Goal:</strong> Under 2.5 seconds</li>
          <li><strong>Measures:</strong> Loading time of the largest content on the page</li>
          <li><strong>Optimization:</strong> Preload critical resources, image optimization</li>
      </ul>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">2. Image Optimization</h2>
      <p>Images often make up the largest part of the page size. Optimization is key.</p>
      
      <h3 style="color: white; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Modern image formats</h3>
      <p>Use efficient formats like WebP and AVIF.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">3. CSS Optimization</h2>
      <p>Minimize and optimize CSS for faster rendering.</p>

      <h2 style="color: white; font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem;">Conclusion</h2>
      <p>Website speed optimization is a continuous process that requires a systematic approach.</p>

      <p><strong>Need help with performance optimization?</strong> Our team of experts will help you identify bottlenecks. <a href="/kontakt" style="color: var(--accent-teal); text-decoration: underline;">Contact us</a>.</p>
    `
  }
];

export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  return allBlogPosts.find(post => post.slug === slug);
}

export function getAllBlogPostSlugs(): string[] {
  return allBlogPosts.map(post => post.slug);
}

export function getRecommendedPosts(currentSlug: string): BlogPostData['recommendations'] {
  const currentPost = allBlogPosts.find(post => post.slug === currentSlug);
  // Return empty array if post not found
  if (!currentPost) return [];

  // Filter out the current post from the main blogPosts array
  const otherPosts = allBlogPosts.filter(post => post.slug !== currentSlug);

  // Pick first two other posts as recommendations
  const recommendations = otherPosts.slice(0, 2).map(post => ({
    slug: post.slug,
    title: post.metadata.title,
    imageSrc: post.metadata.ogImage,
    imageAlt: post.metadata.ogImageAlt,
    date: post.metadata.datePublished,
    author: post.metadata.author,
  }));

  return recommendations;
}
