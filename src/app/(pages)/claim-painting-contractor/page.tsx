"use client";

import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import BackgroundImage from "@/images/background/chooz_landscrapers_header-wallpaper.png";
import Image from "next/image";

const ClaimPaintingContractor = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="bg-[#f5faff] text-black relative">
      <Image
        src={BackgroundImage}
        alt="Background"
        sizes="fill"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="container xl:max-w-[1340px] mx-auto px-5 py-10 md:py-20 relative z-10">
        <h1 className="max-w-4xl mx-auto text-[35px] lg:text-[40px] font-medium mb-[30px] md:mb-[40px] text-center leading-10 md:leading-13 font-poppins">
          Want to get your painting company listed on Chooz Landscapers?
        </h1>
        <ul className="max-w-2xl mx-auto flex flex-wrap items-center sm:justify-center justify-start gap-4 mb-[10px]">
          <li className="flex justify-center gap-2 text-[21px] md:text-[25px] font-medium">
            <FaRegCheckCircle className="text-[var(--clr-icon-check)] w-[25px] h-[25px] md:w-[30px] md:h-[30px] mt-0.5 md:mt-1" />
            <span className="w-[calc(100%_-_25px)]">
              Make it easier for customers to find you
            </span>
          </li>
          <li className="flex justify-center gap-2 text-[21px] md:text-[25px] font-medium">
            <FaRegCheckCircle className="text-[var(--clr-icon-check)] w-[25px] h-[25px] md:w-[30px] md:h-[30px] mt-0.5 md:mt-1" />
            <span className="w-[calc(100%_-_25px)]">Get More Leads</span>
          </li>
          <li className="flex justify-center gap-2 text-[21px] md:text-[25px] font-medium">
            <FaRegCheckCircle className="text-[var(--clr-icon-check)] w-[25px] h-[25px] md:w-[30px] md:h-[30px] mt-0.5 md:mt-1" />
            <span className="w-[calc(100%_-_25px)]">Completely Free</span>
          </li>
        </ul>
        <div className="h-[3200px] md:h-[2700px] overflow-hidden">
          {isClient && (
            <div className="contractor-form ml-[-60px] md:ml-0 w-[calc(100%_+_120px)] md:w-full h-full block">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/JVjrm4zYhdqPTTGriPzK"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "4px",
                }}
                id="inline-JVjrm4zYhdqPTTGriPzK"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Chooz Landscapers - List Your Company for Free"
                data-height="2000"
                data-layout-iframe-id="inline-JVjrm4zYhdqPTTGriPzK"
                data-form-id="JVjrm4zYhdqPTTGriPzK"
                title="Chooz Landscapers - List Your Company for Free"></iframe>
              <script src="https://link.msgsndr.com/js/form_embed.js"></script>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ClaimPaintingContractor;
