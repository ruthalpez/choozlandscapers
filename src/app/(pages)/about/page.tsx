import CardProfile from "@/components/card/CardProfile";
import React from "react";

const AboutPage = () => {
  return (
    <main className="bg-[var(--clr-tertiary)] text-white relative">
      <div className="container xl:max-w-[1340px] mx-auto px-5 py-10 md:py-20 relative z-10">
        <h1 className="max-w-4xl mx-auto text-[35px] lg:text-[40px] font-medium mb-[30px] md:mb-[40px] text-center leading-10 md:leading-13 font-poppins">
          <span className="text-[35px] block">Meet The Team</span>
          <span>Getting Results For Landscapers And Their Customers</span>
        </h1>
        <div className="border-b-[3px] border-white max-w-[500px] mx-auto my-[30px]" />
        <p className="max-w-4xl mx-auto text-center">
          Chooz Landscapers is part of a larger ecosystem of niche directories
          (choozbetter.com) that helps local businesses get discovered by
          customers looking for their services. We strive to set ourselves apart
          from other directories by providing value to both users in the market
          for a good painter and also painting contractors that don’t want to
          pay money for low quality leads.
        </p>

        <div className="flex flex-wrap justify-center gap-7 mt-10">
          <CardProfile
            name="Ed Dus"
            image="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/093576fb-d769-4bf4-57a0-502015f5c100/sign"
            position="Founder - Managing Partner"
          />
          <CardProfile
            name="Mike Norwood"
            image="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/d796bb71-bc82-4686-e6b1-18520639c300/sign"
            position="Co-Founder - Business Development"
          />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
