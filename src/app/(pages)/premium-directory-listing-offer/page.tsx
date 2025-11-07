"use client";

import Image from "next/image";
import CardPricing from "@/components/card/CardPricing";

import BackgroundImage from "@/images/background/chooz_landscrapers_header-wallpaper.png";

const PricingListVerified = [
  "Done for you expanded listing page on Chooz Landscapers",
  "We include your basic business information, company logo, 4 of your best pictures, Google and Facebook reviews, services, and service area",
  "Your listing page gets a Chooz Painter verified badge that you can also use on your website (emailed to your upon request)",
  "We post any updates, additional pictures or videos, reviews, of special offers on your page for free (all you have to do is email us)",
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

const PremiumDirectoryListingOffer = () => {
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
            description="For a limited time we are offering free Chooz Landscapers Verified Listing to all painting contractors that verify their company information and claim their profile page."
            price="Free"
            pricingList={PricingListVerified}
            Form={FormVerified}
          />
        </div>
      </div>
    </main>
  );
};

export default PremiumDirectoryListingOffer;
