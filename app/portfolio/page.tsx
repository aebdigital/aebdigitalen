import { InfiniteGrid } from "@/components/InfiniteGrid";
import { FaHandPointer } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Our Best Websites and Projects | AEB Digital",
  description: "See examples of our projects for 120+ satisfied clients - websites, e-shops, applications for companies. Modern design, SEO optimization, responsive web.",
  keywords: [
    "web portfolio",
    "website examples",
    "web design references",
    "e-shop examples",
    "web projects",
    "AEB Digital projects",
    "modern websites",
  ],
  alternates: {
    canonical: "https://aebdigital.com/portfolio",
  },
  openGraph: {
    title: "Portfolio - 120+ Successful Projects | AEB Digital",
    description: "See examples of our projects - websites, e-shops, applications for companies.",
    url: "https://aebdigital.com/portfolio",
    type: "website",
  },
};

export default function PortfolioPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header py-32 text-white relative">
        <div className="container">
          <h1 className="page-title">Our Portfolio</h1>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        className="portfolio-apple-style py-5 relative overflow-hidden"
      >
        <div className="portfolio-content relative z-10">
          {/* Portfolio Gallery */}
          <div className="portfolio-gallery relative">
            {/* Infinite Grid Component */}
            <InfiniteGrid />
            {/* Drag Prompt - Centered overlay with bounce animation */}
            <div
              id="drag-prompt"
              className="drag-prompt absolute inset-0 flex justify-center items-center z-20 pointer-events-none transition-opacity duration-500"
            >
              <div className="flex items-center bg-black/70 backdrop-blur-sm px-6 py-4 rounded-full text-white text-2xl animate-bounce-gentle">
                <FaHandPointer className="drag-hand-icon mr-3" />
                <span className="drag-prompt-text">Drag to explore gallery</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
