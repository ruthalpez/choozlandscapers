import Image from "next/image";
import CategoriesSection from "@/components/CategoriesSection";
import HeroSection from "@/components/HeroSection";
import ResponsiveImage from "@/components/ResponsiveImage";
import ImageBox from "@/components/ImageBox";
import JsonLdHead from "@/components/JsonLdHead";
import BlogCarousel from "@/components/BlogCarousel";

import FloatedBallon from "@/images/floated/chooz_landscrapers_hot_air_balloon.png";
import ThinkingGirl from "@/images/chooz_landscrapers_thinking_girl.png";

import BadgeResearch from "@/images/badge/chooz_landscrapers_research_painters.png";
import BadgeVerified from "@/images/badge/chooz_landscrapers_verified_landscrapers.png";
import BadgeBestAward from "@/images/badge/chooz_landscrapers_top_landscrapers.png";
import BadgeTopAward from "@/images/badge/chooz_landscrapers_best_landscrapers.png";

import VerifiedContractors from "@/images/others/chooz_landscrapers_quality_engagement.png";
import RealReviewAnalysis from "@/images/others/chooz_landscrapers_real_review-analysis.png";
import AIOptimizedProfiles from "@/images/others/chooz_landscrapers_ai_optimized_profiles.png";

const AllStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "choozlandscapers",
  url: "https://choozlandscapers.com/",
  logo: "https://www.choozlandscapers.com/images/choozlandscapers-logo.png",
  description: "Find local landscapers and painting companies in your area.",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61573089310812",
    "https://www.instagram.com/chooz_landscapers/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@choozlandscapers.com",
    contactType: "Customer Service",
  },
  knowsAbout: [
    "Landscapers",
    "Painting Services",
    "Home Improvement",
    "Local Contractors",
  ],
};

// Website Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "choozlandscapers",
  url: "https://choozlandscapers.com/",
  description:
    "Find local landscapers and painting companies in your area. Directory of verified painting contractors with reviews, ratings, and professional credentials.",
  publisher: {
    "@type": "Organization",
    name: "choozlandscapers",
    url: "https://choozlandscapers.com/",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://choozlandscapers.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  mainEntity: {
    "@type": "WebPage",
    "@id": "https://choozlandscapers.com/#webpage",
    url: "https://choozlandscapers.com/",
    name: "Find Local Landscapers - choozlandscapers Directory",
    description:
      "Discover verified painting contractors in your area. Compare reviews, ratings, and credentials to find the best landscapers for your project.",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://choozlandscapers.com/#website",
    },
    about: {
      "@type": "Thing",
      name: "Painting Services Directory",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://choozlandscapers.com/",
        },
      ],
    },
  },
};

const jsonLdSchemas = [organizationSchema, websiteSchema];

export default async function Home() {
  return (
    <main>
      <JsonLdHead jsonLd={jsonLdSchemas} />

      <HeroSection />

      <div className="container xl:max-w-6xl mx-auto px-5 pt-5 pb-10">
        <div className="py-10">
          <h2 className="md:text-center text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-(--clr-heading) font-medium font-poppins">
            Chooz Landscapers Directory Standards
          </h2>
          <div className="border-b-[3px] border-(--clr-tertiary) max-w-[180px] md:max-w-[275px] md:mx-auto my-[30px]" />
          <div className="space-y-6!">
            <p>
              We maintain the highest standards for our directory by verifying
              credentials, analyzing customer feedback, and recognizing
              excellence. Every listed painter meets our baseline requirements,
              with top performers earning special recognition.
            </p>
          </div>
          <div className="flex flex-wrap items-center md:items-start justify-center my-10 gap-15 md:gap-0">
            <ImageBox
              image={BadgeResearch.src}
              alt="Magnifying glass highlighting a score of 40 surrounded by thumbs-up icons, charts, and review platforms like Google, Yelp, Angi, Facebook, and BBB, symbolizing Chooz Landscapers’ quality and engagement rating system based on multi-platform customer feedback"
              heading="Research Landscapers"
              className="w-[200px]"
            />
            <div className="hidden md:block mt-16 flex-1 border-t-2 border-black border-dashed" />
            <ImageBox
              image={BadgeVerified.src}
              alt="Chooz Landscapers Verified Badge 2025 – green hexagon certification badge for verified landscaping professionals, awarded by Chooz directory."
              heading="Chooz Landscapers Certified"
              className="w-[200px]"
            />
            <div className="hidden md:block mt-16 flex-1 border-t-2 border-black border-dashed" />
            <ImageBox
              image={BadgeTopAward.src}
              alt="2025 Chooz Landscapers Best Landscaper Award badge with gold and blue hexagon design and ribbon banner"
              heading="Top Painter Award"
              className="w-[200px]"
            />
            <div className="hidden md:block mt-16 flex-1 border-t-2 border-black border-dashed" />
            <ImageBox
              image={BadgeBestAward.src}
              alt="Chooz Landscapers 2025 Best Landscaper Award badge in gold and blue, showcasing top-rated landscaping company recognition"
              heading="Best Painter Award"
              className="w-[200px]"
            />
          </div>
          <Image
            src={ThinkingGirl}
            alt="Illustration of a thoughtful woman surrounded by abstract decision-making paths and data nodes, representing Chooz Landscapers' smart search system for finding reliable landscaping professionals"
            width={800}
            height={800}
            className="mx-auto"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-[#f4f4f4]">
        <div className="container xl:max-w-6xl mx-auto px-5 py-5">
          <div className="py-10">
            <CategoriesSection />
          </div>
        </div>
      </div>

      {/* Verified Contractors */}
      <div className="container xl:max-w-6xl mx-auto px-5 py-5">
        <div className="py-10">
          <div className="flex flex-col lg:flex-row gap-15 lg:gap-30">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-(--clr-heading) font-medium font-poppins">
                Verified Contractors
              </h2>
              <div className="border-b-[3px] border-(--clr-tertiary) max-w-[275px] my-[30px]" />
              <p>
                Every painting company in our directory is verified before being
                listed. After verification, we evaluate each company using our
                Chooz Landscapers scoring system, which considers over 40
                factors including customer reviews, industry experience, and
                online presence. This process helps homeowners find established
                professionals they can trust. For landscapers, earning our
                certified, top, or best painter award badges helps you stand out
                and build credibility with potential customers.
              </p>
            </div>
            <div className="w-full lg:w-[40%]">
              <Image
                src={VerifiedContractors.src}
                alt="Customer sentiment meter showing reviews from Google, Yelp, Angi, BBB, Facebook, and Instagram with a rating range from sad to happy"
                width={500}
                height={500}
                className="mr-15 ml-auto md:mr-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Real Review Analysis */}
      <div className="container xl:max-w-6xl mx-auto px-5 py-5">
        <div className="py-10">
          <div className="flex flex-col lg:flex-row-reverse gap-15 lg:gap-30">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-(--clr-heading) font-medium font-poppins">
                Real Review Analysis
              </h2>
              <div className="border-b-[3px] border-(--clr-tertiary) max-w-[275px] my-[30px]" />
              <p>
                We go beyond simple star ratings by analyzing reviews across all
                major platforms including Google, Facebook, Yelp, Angi, and
                Better Business Bureau. Our system examines review patterns,
                customer sentiment, response rates, and how contractors handle
                both positive and negative feedback. This comprehensive analysis
                gives homeowners a complete picture of each painter's reputation
                and service quality. For contractors, we help you leverage your
                positive reviews across all platforms, even if most of your
                reviews are concentrated on just one or two sites.
              </p>
            </div>
            <div className="w-full lg:w-[40%]">
              <Image
                src={RealReviewAnalysis.src}
                alt="Gauge-style review meter graphic for Chooz Landscapers showing a needle pointing toward the highest satisfaction range (30), surrounded by review platform icons including Google, Facebook, Yelp, Instagram, BBB, and Angi, with emoji faces ranging from sad to very happy reflecting sentiment scores."
                width={500}
                height={500}
                className="mr-15 ml-auto md:mr-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI-Optimized Profiles */}
      <div className="container xl:max-w-6xl mx-auto px-5 py-5">
        <div className="py-10">
          <div className="flex flex-col lg:flex-row gap-15 lg:gap-30">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-(--clr-heading) font-medium font-poppins">
                AI-Optimized Profiles
              </h2>
              <div className="border-b-[3px] border-(--clr-tertiary) max-w-[275px] my-[30px]" />
              <p>
                Your listing isn't just another directory page - it's built
                specifically to be discovered by modern search technology. As
                customers increasingly use AI assistants like ChatGPT,
                Perplexity, and Google's AI Overview to find local services,
                having properly structured data becomes critical. Our profiles
                use schema markup, structured data, and semantic optimization to
                ensure painting companies get recommended by AI systems. This
                forward-thinking approach means you're not just visible today,
                but positioned for how customers will search tomorrow.
              </p>
            </div>
            <div className="w-full lg:w-[40%]">
              <Image
                src={AIOptimizedProfiles.src}
                alt="AI-optimized landscrapers directory interface illustration showing a central web layout connected to modular content blocks, representing structured schema markup, code integration, and intelligent data flow for enhanced profile performance."
                width={500}
                height={500}
                className="mr-15 ml-auto md:mr-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {/* <div className="bg-[#d4e8ff]">
        <div className="container xl:max-w-6xl mx-auto px-5 pt-5 pb-10">
          <div className="py-10 space-y-10">
            <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
              Featured Articles
            </h2>

            <BlogCarousel />
          </div>
        </div>
      </div> */}

      {/* Find Painting Contractorss Near You */}
      <div className="bg-[#f4f4f4]">
        <div className="container xl:max-w-6xl mx-auto px-5 pt-5">
          <div className="py-10 space-y-10">
            <div className="space-y-5 text-center">
              <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-(--clr-heading) font-medium font-poppins">
                Find Painting Contractors Near You
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
                vel esse hic vitae cum! Minus magni iure vel aspernatur nemo
                dolore placeat quod veritatis. Et aperiam inventore in.
                Accusamus, corrupti?
              </p>
            </div>
            <div className="columns-3">
              {AllStates.map((state) => (
                <p
                  key={state}
                  className="text-center text-[16px] font-medium font-poppins">
                  {/* <Link
                  href={`/state/${state.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[blue]"> */}
                  {state}
                  {/* </Link> */}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* We Help You Find The Top Landscapers In Your Area */}
      <div className="container xl:max-w-6xl mx-auto px-5 pt-5">
        <div className="pt-10">
          <div className="flex flex-col lg:flex-row gap-15 lg:gap-30">
            <div className="w-full lg:w-2/3">
              <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-(--clr-heading) font-medium font-poppins">
                We Help You Find The Top Landscapers In Your Area
              </h2>
              <div className="border-b-[3px] border-(--clr-tertiary) max-w-[275px] my-[30px]" />
              <p>
                Part of what makes Chooz Landscapers different from other
                directories is that we only gather the information you need to
                make an effective comparison between the painting contractors in
                your area. We don’t offer sponsored ads and we only list
                companies based on your geographical search.
              </p>
            </div>
            <div className="w-full lg:w-1/3">
              <Image
                src={FloatedBallon.src}
                alt="Illustration of a hot air balloon with Chooz logo and two people scouting and planning, symbolizing growth, vision, and elevated landscaping standards"
                width={300}
                height={300}
                className="mr-15 ml-auto md:mr-auto w-[70px] lg:w-[120px]"
              />
            </div>
          </div>

          <div className="pt-10 md:pt-15">
            <ResponsiveImage />
          </div>
        </div>
      </div>
    </main>
  );
}
