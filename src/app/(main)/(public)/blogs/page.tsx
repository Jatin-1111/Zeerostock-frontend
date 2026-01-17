"use client";

import { Search, Share2, Heart } from "lucide-react";
import { useState } from "react";

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState("Surplus Management");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Surplus Management",
    "Procurement",
    "Logistics",
    "Finance",
    "Sustainability",
  ];

  const featuredArticle = {
    title:
      "Maximizing ROI: A Deep Dive into B2B Surplus Liquidation Strategies",
    description:
      "Explore innovative approaches to turn excess inventory into a significant revenue stream for your business. Learn from industry leaders on how to optimize pricing, logistics, and sales channels.",
    author: "Jane Doe",
    date: "October 26, 2023",
    category: "FEATURED ARTICLE",
    image:
      "https://www.figma.com/api/mcp/asset/72cdb121-cee1-471c-bf3d-800b9f508b39",
  };

  const recentArticles = [
    {
      id: 1,
      title: "The future of supply chain: Trends to watch",
      description:
        "How technology and sustainability are reshaping global logistics and what it means for your business",
      author: "John Smith",
      date: "Oct 22,2024",
      category: "Logistics",
      image:
        "https://www.figma.com/api/mcp/asset/e20733b8-090c-4fc9-be4b-0f4181639536",
    },
    {
      id: 2,
      title: "The Financial Impact of Efficient Inventory Liquidation",
      description:
        "A CFO's guide to understanding the hidden costs of surplus stock and the benefits of proactive liquidation.",
      author: "Sarah Chen",
      date: "Oct 11, 2023",
      category: "Finance",
      image:
        "https://www.figma.com/api/mcp/asset/e20733b8-090c-4fc9-be4b-0f4181639536",
    },
    {
      id: 3,
      title: "Smart Procurement: Leveraging Data for Better Deals",
      description:
        "Unlock cost savings and efficiency by integrating data analytics into your procurement processes.",
      author: "Emily Carter",
      date: "Oct 19, 2023",
      category: "Procurement",
      image:
        "https://www.figma.com/api/mcp/asset/e20733b8-090c-4fc9-be4b-0f4181639536",
    },
    {
      id: 4,
      title: "5 Common Mistakes in Surplus Inventory Liquidation",
      description:
        "Avoid these pitfalls to ensure you get the maximum return on your excess stock.",
      author: "Michael B.",
      date: "Oct 08, 2023",
      category: "Surplus Management",
      image:
        "https://www.figma.com/api/mcp/asset/e20733b8-090c-4fc9-be4b-0f4181639536",
    },
    {
      id: 5,
      title: "Circular Economy: Turning Surplus into an Asset",
      description:
        "Discover how businesses are adopting circular models to reduce waste and create new value streams.",
      author: "David Lee",
      date: "Oct 15, 2023",
      category: "Sustainability",
      image:
        "https://www.figma.com/api/mcp/asset/e20733b8-090c-4fc9-be4b-0f4181639536",
    },
    {
      id: 6,
      title: "Online Auctions vs. Direct Sales: Which is Right for You?",
      description:
        "A comparative analysis of the most popular B2B surplus liquidation channels.",
      author: "Olivia Martinez",
      date: "Oct 05, 2023",
      category: "Surplus Management",
      image:
        "https://www.figma.com/api/mcp/asset/e20733b8-090c-4fc9-be4b-0f4181639536",
    },
  ];

  const popularTopics = [
    "B2B Auctions",
    "Pricing Strategies",
    "Return Analytics",
    "Surplus Liquidation",
    "Supply Chain Trends",
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section - Scale wrapper: 2/3 of original size via width/max-width */}
      <div className="w-full mx-auto">
        <section className="bg-linear-to-b from-[#d7ffef] to-white pt-[40px] pb-[26.67px] px-[53.33px] rounded-b-[20px]">
          {/* Hero Content */}
          <div className="text-center mb-[26.67px]">
            <h1 className="text-[40px] font-semibold leading-[51.33px] text-[#0d1b2a] mb-[13.33px]">
              Zeerostock Insights & Industry Trends
            </h1>
            <p className="text-[13.33px] font-medium text-[#9c9c9c] leading-normal max-w-[455.33px] mx-auto">
              Discover experts tips, industry analysis and strategies to
              maximize surplus value.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-[553.33px] mx-auto bg-[rgba(235,235,235,0.65)] rounded-[33.33px] shadow-[0px_0px_3.33px_0px_rgba(24,181,34,0.5)] px-[16.67px] py-[6.67px] mb-[26.67px] flex items-center justify-between">
            <input
              type="text"
              placeholder="Search articles, topics and authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-[12.67px] font-medium text-[#374151] opacity-80 placeholder:text-[#374151] placeholder:opacity-80"
            />
            <button className="flex items-center gap-[6.67px] ml-[200px]">
              <Search className="w-[16px] h-[16px] text-[#374151] opacity-80" />
              <span className="text-[16px] font-medium text-[#374151] opacity-80">
                Search
              </span>
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex items-center justify-center gap-[6.67px] flex-wrap mb-[20px]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-[8px] py-[6.67px] rounded-[53.33px] text-[13.33px] font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#eeffef] text-[#2aae7a]"
                    : "text-[#9c9c9c]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Article */}
        <section className="px-[53.33px] py-[26.67px]">
          <div className="bg-white rounded-[13.33px] shadow-[0px_0px_7.2px_0px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="flex gap-[10px] p-[20px]">
              {/* Featured Image */}
              <div className="w-[420px] h-[284px] rounded-[13.33px] overflow-hidden flex-shrink-0">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Featured Content */}
              <div className="flex-1 flex flex-col justify-between py-[4px]">
                <div>
                  <div className="inline-block bg-[#eeffef] px-[8px] py-[6.67px] rounded-[53.33px] mb-[12px]">
                    <span className="text-[12px] font-semibold text-[#2aae7a]">
                      {featuredArticle.category}
                    </span>
                  </div>

                  <h2 className="text-[20px] font-semibold leading-[27.33px] text-[#0d1b2a] mb-[14px]">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-[13.33px] font-medium text-[#9c9c9c] leading-normal mb-[22px]">
                    {featuredArticle.description}
                  </p>

                  <p className="text-[16px] font-medium text-[#0d1b2a] leading-[27.33px] mb-[15px]">
                    By {featuredArticle.author} · {featuredArticle.date}
                  </p>
                </div>

                <button className="bg-[#1e3a8a] text-white px-[73.33px] py-[10px] rounded-[8px] text-[13.33px] font-semibold self-start">
                  Read Article
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="px-[53.33px] py-[26.67px]">
          <h2 className="text-[27.33px] font-semibold text-[#0d1b2a] mb-[20px]">
            Recent Articles
          </h2>

          <div className="grid grid-cols-3 gap-[20px]">
            {recentArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-[13.33px] shadow-[0px_0px_6.67px_0px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col h-[360px]"
              >
                {/* Article Image */}
                <div className="w-full h-[150px] overflow-hidden flex-shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="p-[10px] flex flex-col flex-1">
                  {/* Category Badge */}
                  <div className="inline-block bg-[#eeffef] px-[8px] py-[3.33px] rounded-[53.33px] mb-[8px] self-start">
                    <span className="text-[8px] font-semibold text-[#2aae7a]">
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[13.33px] font-semibold leading-[18.67px] text-[#0d1b2a] mb-[8px] line-clamp-2 min-h-[37.34px]">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[8px] font-semibold text-[#9c9c9c] leading-[11.33px] mb-[16px] line-clamp-3 min-h-[33.99px]">
                    {article.description}
                  </p>

                  {/* Spacer to push footer content to bottom */}
                  <div className="flex-1"></div>

                  {/* Divider */}
                  <div className="border-t border-[#e5e5e5] mb-[6.67px]"></div>

                  {/* Author & Date */}
                  <div className="flex items-center justify-between mb-[3.33px]">
                    <p className="text-[8px] font-semibold text-[#9c9c9c] leading-[11.33px]">
                      By {article.author} <span className="font-black">·</span>{" "}
                      {article.date}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className="text-[9.33px] font-semibold text-[#1e3a8a] leading-[11.33px]"
                    >
                      Read More
                    </a>
                    <div className="flex items-center gap-[8px]">
                      <button className="p-[2px]">
                        <Heart className="w-[18.67px] h-[18.67px] text-[#9c9c9c]" />
                      </button>
                      <button className="p-[2px]">
                        <Share2 className="w-[18.67px] h-[18.67px] text-[#9c9c9c]" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Popular Topics */}
        <section className="px-[53.33px] py-[26.67px]">
          <h2 className="text-[27.33px] font-semibold text-[#0d1b2a] mb-[20px] text-center">
            Popular Topics
          </h2>

          <div className="flex items-center justify-center gap-[10px] flex-wrap">
            {popularTopics.map((topic) => (
              <button
                key={topic}
                className="bg-[#f5f5f5] border border-[#e0e0e0] px-[13.33px] py-[8px] rounded-[13.33px] text-[18.67px] font-medium text-[#0d1b2a] hover:bg-[#eeffef] hover:text-[#2aae7a] hover:border-[#2aae7a] transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="px-[53.33px] py-[26.67px] pb-[53.33px]">
          <div className="bg-[#2aae7a] rounded-[20px] px-[85.33px] py-[33.33px] text-center">
            <h2 className="text-[30px] font-semibold text-white mb-[40px] leading-normal">
              Join 10,000+ business receiving our weekly insights
            </h2>

            {/* Newsletter Form */}
            <div className="flex items-center gap-[13.33px] max-w-[456.67px] mx-auto mb-[22.67px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white border border-[#8f8f8f] rounded-[8px] px-[11.67px] py-[10px] text-[10px] text-[#696969] outline-none"
              />
              <button className="bg-[#1e3a8a] text-white px-[36.67px] py-[10px] rounded-[8px] text-[12px] font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>

            <p className="text-[13.33px] font-medium text-white leading-normal">
              No Spam. Only industry insights. Unsubscribe any time
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
