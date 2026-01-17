"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.id;

  // Mock data - replace with actual API call
  const blogData = {
    id: blogId,
    category: "Surplus Management",
    title: "Mastering Surplus Inventory: A Guide for Modern B2B Success",
    subtitle:
      "Unlock growth and efficiency by transforming your excess stock from a liability into strategic asset",
    author: {
      name: "Jane Doe",
      avatar:
        "https://www.figma.com/api/mcp/asset/142d612f-34a3-46fc-9f4f-c0203d545b75",
    },
    publishedDate: "Jan 22, 2024",
    heroImage:
      "https://www.figma.com/api/mcp/asset/654e75f3-919b-4c38-bb12-4fea84047571",
    content: [
      {
        type: "heading",
        text: "How to Sell Your Surplus Stocks: Complete Guide",
      },
      {
        type: "paragraph",
        text: "How to sell surplus stock? At some point, every business faces excess inventory. The real challenge here is how to sell it without losing any value. In the rush to clear space for fresh stock, or during emergencies, you are less likely to think about the right way. While flash sales, deep discounts and dumping through random middlemen may seem quick, they bring heavy financial loss leading to reduced brand value.",
      },
      {
        type: "paragraph",
        text: "Although excess stock appears as a threat, there are still sustainable ways to turn them into cash flow. Read further to explore the best methods and the challenges in selling surplus stock and how zeerostock helps you move goods smarter and faster without losing value.",
      },
      {
        type: "heading",
        text: "Challenges in Selling Surplus Stock",
      },
      {
        type: "paragraph",
        text: "Standard retail sales are straightforward, but when it comes to surplus inventory, it is not. The latter is quite challenging, as businesses confront several hurdles on the way. Having prior ideas about these challenges and their exact solution is the only key to overcome them, especially in surplus liquidation. This highlights the importance of reliable platforms like Surplus Market, where sellers can connect with buyers easily and vice versa, speeding up the entire process.",
      },
      {
        type: "paragraph",
        text: "Here are the challenges often B2B businesses face in selling surplus stock:",
      },
      {
        type: "list",
        items: [
          "Difficulty in finding reliable buyers for bulk items",
          "Price reductions that impact overall profitability",
          "Limited access to established resale channels",
          "Risk of items losing value over time",
          "Complexities in managing shipping and distribution for bulk orders",
        ],
      },
      {
        type: "heading",
        text: "How Zeerostock Helps You Sell Excess Stock Faster",
      },
      {
        type: "paragraph",
        text: "Zeerostock is a specialized platform that makes selling surplus inventory simple and efficient. This dedicated platform connects sellers with a wide network of buyers who are interested in purchasing excess stock across multiple industries. Sellers can list bulk stock easily, reach active buyers, and finalize deals without wasting time or money.",
      },
      {
        type: "paragraph",
        text: "Safe and reliable resale channels are another advantage of Zeerostock, which makes it easier to clear overstock while maintaining profitability. By using this marketplace, companies can have better access to liquidation marketplace buyers, ensuring faster transactions and smooth distribution of goods.",
      },
      {
        type: "subheading",
        text: "Step-by-Step Process to Sell Your Surplus",
      },
      {
        type: "paragraph",
        text: "If you are still confused about how to sell surplus stock, it is a simple process. All it requires is that you do it in the correct way. This streamlined approach ensures you don't waste time wondering how to sell excess stock, and end up with loss.",
      },
      {
        type: "paragraph",
        text: "Here's how you can get started:",
      },
      {
        type: "list",
        items: [
          "Identify the products you want to liquidate.",
          "Gather key details such as quantity, product condition, and pricing.",
          "Register and create a listing on Sell your Surplus.",
          "Upload product information with images and descriptions.",
          "Connect with interested buyers and finalize deals.",
          "Arrange logistics and complete the transfer.",
        ],
      },
      {
        type: "paragraph",
        text: "Following this method makes it easier to sell excess stock or liquidation stock effectively.",
      },
    ],
  };

  const recommendedArticles = [
    {
      id: "1",
      title: "Financial impact of inventory liquidation",
      image:
        "https://www.figma.com/api/mcp/asset/ecc6fcf6-88f5-433b-ad4c-1120cf68b569",
    },
    {
      id: "2",
      title: "Smart Procurement for better deals",
      image:
        "https://www.figma.com/api/mcp/asset/104ad4db-1776-4e39-a0e9-78f2ae77b707",
    },
    {
      id: "3",
      title: "Building Trust in B2B Marketplace",
      image:
        "https://www.figma.com/api/mcp/asset/343755b1-96de-4249-845d-142a90ceaccc",
    },
  ];

  const industryCategories = [
    "Electronics",
    "Apparel",
    "Home Goods",
    "Industrial",
    "Automotive",
  ];

  return (
    <div className="min-h-screen w-full bg-[#EEFBF6] py-10 px-5">
      {/* Main Content */}
      <div className="mx-auto w-full px-[53.33px] pb-[53.33px] pt-[16.67px]">
        {/* Category Badge */}
        <div className="inline-flex items-center justify-center rounded-[53.33px] bg-[#EEFFEF] px-[8px] py-[3.33px]">
          <p className="text-[12px] font-semibold leading-none text-[#2AAE7A]">
            {blogData.category}
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="mt-[17.33px] grid grid-cols-12 gap-[26.67px]">
          {/* Left Column - Main Content */}
          <div className="col-span-8">
            {/* Title */}
            <h1 className="text-[26.67px] font-semibold leading-[36.67px] text-[#0D1B2A]">
              {blogData.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-[16px] text-[16px] font-medium leading-normal text-[#9C9C9C]">
              {blogData.subtitle}
            </p>

            {/* Divider */}
            <div className="mt-[24px] h-[0.4px] w-full bg-[#0D1B2A] opacity-20" />

            {/* Author & Date */}
            <div className="mt-[10px] flex items-center gap-[10.67px]">
              <div className="relative h-[35.33px] w-[35.33px] overflow-hidden rounded-full">
                <Image
                  src={blogData.author.avatar}
                  alt={blogData.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-[2.67px]">
                <p className="text-[16px] font-medium leading-[36.67px] text-[#0D1B2A]">
                  {blogData.author.name}
                </p>
              </div>
              <div className="ml-auto">
                <p className="text-[13.33px] font-medium leading-normal text-[#9C9C9C]">
                  Published {blogData.publishedDate}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-[10px] h-[0.4px] w-full bg-[#0D1B2A] opacity-20" />

            {/* Hero Image */}
            <div className="relative mt-[26.67px] h-[277.33px] w-full overflow-hidden rounded-[13.33px]">
              <Image
                src={blogData.heroImage}
                alt={blogData.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="mt-[26.67px] space-y-[24px]">
              {blogData.content.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <h2
                      key={index}
                      className="text-[19.33px] font-medium leading-normal text-black"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "subheading") {
                  return (
                    <h3
                      key={index}
                      className="text-[16px] font-medium leading-normal text-black"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={index}
                      className="text-[16px] font-medium leading-normal text-[#9C9C9C]"
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ol
                      key={index}
                      className="ml-[24px] list-decimal space-y-[5.33px]"
                    >
                      {block.items?.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-[16px] font-medium leading-normal text-[#9C9C9C]"
                        >
                          {item}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-4 space-y-[40px]">
            {/* Recommended Articles */}
            <div>
              {/* Divider */}
              <div className="mb-[21.33px] h-[0.4px] w-full bg-[#0D1B2A] opacity-20" />

              <h3 className="mb-[21.33px] text-[20px] font-semibold leading-normal text-[#0D1B2A]">
                Recommended Articles
              </h3>

              <div className="space-y-[18.67px]">
                {recommendedArticles.map((article) => (
                  <div key={article.id} className="flex gap-[16px]">
                    <div className="relative h-[53.33px] w-[76px] flex-shrink-0 overflow-hidden rounded-[6.67px]">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="flex-1 text-[14px] font-semibold leading-normal text-[#0D1B2A]">
                      {article.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Categories */}
            <div>
              {/* Divider */}
              <div className="mb-[21.33px] h-[0.4px] w-full bg-[#0D1B2A] opacity-20" />

              <h3 className="mb-[21.33px] text-[20px] font-semibold leading-normal text-[#0D1B2A]">
                Industry Categories
              </h3>

              <div className="flex flex-wrap gap-[9.33px]">
                {industryCategories.map((category) => (
                  <div
                    key={category}
                    className="inline-flex items-center justify-center rounded-[53.33px] bg-[#EEFFEF] px-[8px] py-[3.33px]"
                  >
                    <p className="text-[9.33px] font-semibold leading-none text-[#2AAE7A]">
                      {category}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto w-full overflow-hidden rounded-[20px] bg-[#2AAE7A] px-[61.33px] py-[33.33px]">
        <div className="text-center">
          <h2 className="text-[30px] font-semibold leading-normal text-white">
            Ready to Transform Your Surplus into Success?
          </h2>
          <p className="mt-[13.33px] text-[14.67px] font-semibold leading-normal text-[#374151]">
            Join thousands of smart buyers who are reducing costs and improving
            efficiency with Zeerostock. Start sourcing surplus inventory today.
          </p>
          <div className="mt-[37.33px] flex items-center justify-center gap-[60px]">
            <button className="flex h-[46.67px] w-[193.33px] items-center justify-center rounded-[8px] bg-[#1E3A8A] px-[73.33px] py-[10px]">
              <span className="text-[14.67px] font-medium leading-normal text-white">
                Explore
              </span>
            </button>
            <button className="flex h-[46.67px] w-[193.33px] items-center justify-center rounded-[8px] bg-white px-[73.33px] py-[10px]">
              <span className="text-[14.67px] font-medium leading-[14.67px] text-[#2AAE7A]">
                Become Supplier
              </span>
            </button>
          </div>
          <p className="mt-[24px] text-[13.33px] font-medium leading-normal text-center text-white">
            • No startup fees • Free to join • Start sourcing immediately
          </p>
        </div>
      </div>
    </div>
  );
}
