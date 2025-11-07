import PricingCard from "@/components/PricingCard";
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const PricingPage = () => {
  return (
    <main className="primary-bg-gradient text-white">
      <div className="container xl:max-w-[1340px] mx-auto px-5 py-10 md:py-20">
        <h1 className="text-[45px] lg:text-[72px] font-medium mb-[30px] md:mb-[40px] text-center max-w-[900px] mx-auto leading-10 md:leading-13 font-poppins">
          Helping Your Painting Business Grow Online
        </h1>
        <ul className="flex flex-col sm:flex-row items-center sm:justify-center justify-start gap-4 mb-[70px]">
          <li className="flex items-center justify-center gap-2 text-[24px] font-medium">
            <FaRegCheckCircle className="text-[var(--clr-icon-check)]" />
            Premium Service
          </li>
          <li className="flex items-center justify-center gap-2 text-[24px] font-medium">
            <FaRegCheckCircle className="text-[var(--clr-icon-check)]" />
            Affordable Prices
          </li>
          <li className="flex items-center justify-center gap-2 text-[24px] font-medium">
            <FaRegCheckCircle className="text-[var(--clr-icon-check)]" />
            No hidden costs
          </li>
        </ul>

        <p className="text-lg sm:text-[24px]">
          * Each service can be purchased individually.
        </p>

        <PricingCard
          title="Business Starter"
          paragraph="Whether you are starting a new painting business or you aren’t happy with your current website, we provide top of the line websites that will make customers think highly of your painting company and help with SEO."
          offers={[
            {
              title: "Done For You Website",
              price: 1299,
              priceText: "/one time",
              lists: [
                "You choose the website you want",
                "Two months of support and updates",
                "Our team works with you until you are satisfied",
                "First 2 months of premium plugins included in price",
              ],
            },
            {
              title: "Monthly Hosting & Support",
              price: 249,
              priceText: "/month",
              lists: [
                "Unlimited updates to your website (does not include complex rebuilds)",
                "Unlimited support",
                "Unlimited domains",
                "Basic SEO optimization",
              ],
            },
          ]}
        />

        <PricingCard
          title="Business Refresh"
          paragraph="If you are happy with your existing website but want a refresh or you want your website audited to see how the SEO is performing, this package is for you."
          offers={[
            {
              title: "Website Audit",
              price: 299,
              priceText: "/one time",
              lists: [
                "Full Website Audit",
                "List of actionable recommendations",
              ],
            },
            {
              title: "Audit Implementation",
              variable: true,
              lists: [
                "Done for implementation",
                "Will work with your developer if you already have one",
              ],
            },
          ]}
        />

        <PricingCard
          title="Lead Generation"
          paragraph="These options are for you if you want to start generating more leads for your business right away."
          offers={[
            {
              title: "Lead Buying",
              variable: true,
              lists: [
                "Only pay for qualified leads",
                "No long-term commitment",
              ],
            },
          ]}
        />

        <PricingCard
          title="Concierge Marketing"
          paragraph="To read about the marketing solutions we can specifically provide your business, please visit Chooz Marketing for Landscapers. Here you find a wide variety of services that can get you more leads, while growing your painting business."
          offers={[
            {
              title: "Done For You Website",
              variable: true,
              lists: [
                "Business Planning",
                "Local SEO",
                "Local Ads & PPC",
                " Social Media Ads",
                "Content (Video & Text)",
                "Website",
              ],
            },
          ]}
        />
      </div>
    </main>
  );
};

export default PricingPage;
