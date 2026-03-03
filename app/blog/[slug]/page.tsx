import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { BackgroundTextAnimation } from "@/components/BackgroundTextAnimation";
import { ContactInfoSection } from "@/components/ContactInfoSection";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { getBlogPostBySlug, getAllBlogPostSlugs, getRecommendedPosts } from "@/lib/blog-posts";

const siteUrl = "https://aebdigital.com";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  // Parse English date to ISO format for article meta tags
  const parseEnDate = (enDate: string) => {
    const months: { [key: string]: string } = {
      "January": "01", "February": "02", "March": "03", "April": "04",
      "May": "05", "June": "06", "July": "07", "August": "08",
      "September": "09", "October": "10", "November": "11", "December": "12"
    };
    const parts = enDate.split(" ");
    if (parts.length >= 3) {
      const month = months[parts[0]] || "01";
      const day = parts[1].replace(",", "").padStart(2, "0");
      const year = parts[2];
      return `${year}-${month}-${day}T00:00:00+01:00`;
    }
    return new Date().toISOString();
  };

  const publishedTime = parseEnDate(post.metadata.datePublished);
  const modifiedTime = post.metadata.dateModified
    ? parseEnDate(post.metadata.dateModified)
    : publishedTime;

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: post.metadata.keywords,
    authors: [{ name: post.metadata.author }],
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      url: post.metadata.canonicalUrl,
      images: [
        {
          url: post.metadata.ogImage,
          width: 1200,
          height: 630,
          alt: post.metadata.ogImageAlt,
        }
      ],
      siteName: "AEB Digital",
      type: "article",
      publishedTime: publishedTime,
      modifiedTime: modifiedTime,
      authors: [`${siteUrl}/about`],
      tags: post.metadata.keywords.split(", "),
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      images: [post.metadata.ogImage],
      creator: "@aebdigital",
      site: "@aebdigital",
    },
    alternates: {
      canonical: post.metadata.canonicalUrl,
    },
  };
}

// Generate BlogPosting JSON-LD schema
function generateBlogPostingSchema(post: ReturnType<typeof getBlogPostBySlug>) {
  if (!post) return null;

  const parseEnDate = (enDate: string) => {
    const months: { [key: string]: string } = {
      "January": "01", "February": "02", "March": "03", "April": "04",
      "May": "05", "June": "06", "July": "07", "August": "08",
      "September": "09", "October": "10", "November": "11", "December": "12"
    };
    const parts = enDate.split(" ");
    if (parts.length >= 3) {
      const month = months[parts[0]] || "01";
      const day = parts[1].replace(",", "").padStart(2, "0");
      const year = parts[2];
      return `${year}-${month}-${day}T00:00:00+01:00`;
    }
    return new Date().toISOString();
  };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.metadata.canonicalUrl,
    },
    headline: post.metadata.title,
    description: post.metadata.description,
    image: `${siteUrl}${post.metadata.ogImage}`,
    dateCreated: parseEnDate(post.metadata.datePublished),
    datePublished: parseEnDate(post.metadata.datePublished),
    dateModified: post.metadata.dateModified
      ? parseEnDate(post.metadata.dateModified)
      : parseEnDate(post.metadata.datePublished),
    author: {
      "@type": "Organization",
      name: post.metadata.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "AEB Digital",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/sources/favicon-aeb.png`,
      },
    },
    inLanguage: "en-US",
    isFamilyFriendly: true,
    keywords: post.metadata.keywords,
    articleSection: post.metadata.category,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recommendations = getRecommendedPosts(slug);
  const blogPostingSchema = generateBlogPostingSchema(post);

  return (
    <>
      {/* BlogPosting JSON-LD Schema */}
      {blogPostingSchema && (
        <Script
          id="blog-posting-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      )}

      <BackgroundTextAnimation />

      {/* Article Header - Centered */}
      <section className="article-header py-20 text-white relative z-10">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="article-meta text-gray-light text-sm mb-4">
            <span>{post.metadata.datePublished}</span> • <span>{post.metadata.author}</span> • <span>{post.metadata.category}</span>
          </div>
          <h1 className="article-title page-title !text-5xl lg:!text-6xl mb-6 !text-center">
            {post.metadata.title}
          </h1>
          <p className="article-excerpt text-lg text-gray-light leading-relaxed">
            {post.metadata.description}
          </p>
        </div>
      </section>

      {/* Article Content and Recommendations */}
      <div className="article-page-layout py-20 relative z-10">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="article-main-content lg:col-span-2 prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Blog Recommendations Section - Sticky */}
          <aside className="blog-recommendations lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-2xl font-bold mb-6 text-white">More Articles</h3>
              <div className="recommendation-list space-y-8">
                {recommendations && recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-item p-4 bg-white/[0.05] rounded-xl border border-white/[0.1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1]">
                    <Link href={`/blog/${rec.slug}`}>
                      <Image src={rec.imageSrc} alt={rec.imageAlt} width={100} height={60} objectFit="cover" className="rounded-md mb-3" />
                      <h4 className="text-lg font-semibold text-white hover:text-accent-teal transition-colors mb-1">{rec.title}</h4>
                      <p className="recommendation-meta text-gray-light text-sm">{rec.date} • {rec.author}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <ContactInfoSection />
      <FAQSection />
      <ContactForm />
      <Footer />
      {/* Large AEB Digital Image below Footer */}
      <div className="relative z-40 w-full h-[400px] pointer-events-none hidden lg:block">
        <Image src="/sources/footimg_copy-removebg-preview.png" alt="AEB DIGITAL" width={1920} height={400} className="object-contain w-full h-full" />
      </div>
    </>
  );
}
