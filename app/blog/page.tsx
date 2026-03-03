import Image from "next/image";
import Link from "next/link";
import { BackgroundTextAnimation } from "@/components/BackgroundTextAnimation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Web Trends, Technologies and Digital Marketing | AEB Digital",
  description: "Expert blog about web technologies, React, JavaScript, digital marketing and SEO optimization. Practical tips and trends from AEB Digital experts for 2025.",
  keywords: [
    "web blog",
    "React trends 2025",
    "JavaScript techniques",
    "SEO strategy",
    "digital marketing blog",
    "web development tips",
    "e-commerce trends",
    "UX design",
  ],
  alternates: {
    canonical: "https://aebdigital.com/blog",
  },
  openGraph: {
    title: "Blog - Web Trends and Technologies | AEB Digital",
    description: "Expert blog about web technologies, React, JavaScript, digital marketing and SEO optimization.",
    url: "https://aebdigital.com/blog",
    type: "website",
  },
};

interface BlogPost {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  date: string;
  author: string;
  title: string;
  description: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "react-trends-2025",
    imageSrc: "/sources/techstack/React-icon.svg.webp",
    imageAlt: "React 2025 trends",
    category: "Technology",
    date: "January 15, 2025",
    author: "AEB Digital",
    title: "Top 10 React Trends for 2025",
    description: "React continues to evolve and in 2025 it brings new possibilities. Check out the most significant trends that will shape the future of frontend...",
  },
  {
    slug: "ux-design-guide",
    imageSrc: "/sources/techstack/apps-figma-icon-2048x2048-ctjj5ab7.webp",
    imageAlt: "UI/UX design",
    category: "Design",
    date: "January 12, 2025",
    author: "AEB Digital",
    title: "How to Create a User-Friendly Design",
    description: "UX design is key to the success of every website. Learn the basic principles that will delight your users...",
  },
  {
    slug: "seo-strategy-2025",
    imageSrc: "/sources/techstack/1f4ac.svg",
    imageAlt: "Digital marketing",
    category: "Marketing",
    date: "January 10, 2025",
    author: "AEB Digital",
    title: "5 Steps to a Successful SEO Strategy",
    description: "SEO optimization is the foundation of every digital strategy. Check out practical steps to improve visibility...",
  },
  {
    slug: "ecommerce-trends-2025",
    imageSrc: "/sources/techstack/shopify-bag-icon-symbol-logo-701751695132537nenecmhs0u-removebg-preview-e1750440978862.webp",
    imageAlt: "E-commerce",
    category: "E-commerce",
    date: "January 8, 2025",
    author: "AEB Digital",
    title: "E-commerce Trends for 2025",
    description: "E-commerce is constantly changing. Discover the latest trends that will influence online sales in the coming year...",
  },
  {
    slug: "javascript-techniques-2025",
    imageSrc: "/sources/techstack/JavaScript-Logo-scaled-e1750439290173.webp",
    imageAlt: "JavaScript",
    category: "Technology",
    date: "January 5, 2025",
    author: "AEB Digital",
    title: "Modern JavaScript Techniques for Developers",
    description: "JavaScript is constantly evolving. Learn the latest techniques and best practices for modern web application development...",
  },
  {
    slug: "web-speed-optimization",
    imageSrc: "/sources/techstack/HTML5_logo_and_wordmark.svg.webp",
    imageAlt: "Websites",
    category: "Development",
    date: "January 3, 2025",
    author: "AEB Digital",
    title: "How to Optimize Website Loading Speed",
    description: "Loading speed is critical for user experience. Check out practical tips for performance optimization...",
  },
];

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-post rounded-[20px] overflow-hidden bg-white/[0.05] border border-white/[0.1] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
      <Link href={`/blog/${post.slug}`}>
        <div className="post-image relative h-48 w-full">
          <Image src={post.imageSrc} alt={post.imageAlt} layout="fill" objectFit="contain" className="transition-transform duration-300 hover:scale-105" />
          <div className="post-category absolute bottom-2 left-2 bg-accent-teal text-white text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </div>
        </div>
        <div className="post-content p-6">
          <div className="post-meta text-gray-light text-sm mb-2 flex space-x-2">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 hover:text-accent-teal transition-colors">{post.title}</h3>
          <p className="text-gray-medium text-base leading-relaxed">{post.description}</p>
        </div>
      </Link>
    </article>
  );
}

export default function BlogPage() {
  return (
    <>
      <BackgroundTextAnimation />

      {/* Page Header */}
      <section className="page-header py-32 text-white relative z-10">
        <div className="container">
          <h1 className="page-title">Blog</h1>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section py-20 relative z-10">
        <div className="container">
          <div className="blog-content">
            <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
