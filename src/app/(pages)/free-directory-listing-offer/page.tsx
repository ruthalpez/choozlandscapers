"use client";

import Image from "next/image";
import CardPricing from "@/components/card/CardPricing";

import BackgroundImage from "@/images/background/chooz_landscrapers_header-wallpaper.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PricingListVerified = [
  "Done for you expanded listing page on Chooz Landscapers",
  "We include your basic business information, company logo, 4 of your best pictures, Google, Facebook, Yelp, Angi, and BBB reviews and ratings, an About section, a Q&A style FAQ, your services, and your service area",
  "Reviews updated every 3-6 months",
];

const FormVerified = () => {
  return (
    <>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/JVjrm4zYhdqPTTGriPzK"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "4px",
          padding: "0 !important",
        }}
        id="inline-JVjrm4zYhdqPTTGriPzK"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Chooz Landscapers - Free Company Listing"
        data-height="2879"
        data-layout-iframe-id="inline-JVjrm4zYhdqPTTGriPzK"
        data-form-id="JVjrm4zYhdqPTTGriPzK"
        title="Chooz Landscapers - Free Company Listing"></iframe>
      <script src="https://link.msgsndr.com/js/form_embed.js"></script>
    </>
  );
};

const FormPreferred = () => {
  return (
    <>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/e1HMvhgCBPt3rYfbqrzj"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "4px",
          padding: "0 !important",
        }}
        id="inline-e1HMvhgCBPt3rYfbqrzj"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Chooz Landscapers - Preferred Listing Form"
        data-height="2879"
        data-layout-iframe-id="inline-e1HMvhgCBPt3rYfbqrzj"
        data-form-id="e1HMvhgCBPt3rYfbqrzj"
        title="Chooz Landscapers - Preferred Listing Form"></iframe>
      <script src="https://link.msgsndr.com/js/form_embed.js"></script>
    </>
  );
};

const FreeDirectoryListingOffer = () => {
  return (
    <main className="primary-bg-gradient text-white">
      <Image
        src={BackgroundImage}
        alt="Background"
        priority
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="container xl:max-w-[1340px] mx-auto p-0 sm:py-20 relative z-10">
        <div className="flex flex-wrap justify-center gap-28">
          <CardPricing
            title="Your Chooz Landscapers Listing Page"
            description="Get a done-for-you listing on a directory that is optimized to get your painting company mentioned on AI engines like ChatGPT and Google AI, without having to pay for leads"
            price="Free"
            pricingList={PricingListVerified}
            Form={FormVerified}
          />
        </div>

        <div className="w-[650px] mx-auto text-white mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 z-10">
          <Link
            href="/premium-directory-listing-offer"
            className="w-full bg-[#ffff00] text-[var(--clr-primary)] font-bold py-3 px-12 rounded-lg flex flex-col items-center">
            <span className="text-[30px]">Premium Listing</span>
            <span className="text-[22px] flex items-center">
              Find Out More <ArrowRight className="ml-1 size-6" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default FreeDirectoryListingOffer;
