"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BackgroundImage from "@/images/background/chooz_landscrapers_header-wallpaper.png";

const ContactPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="primary-bg-gradient">
      <Image
        src={BackgroundImage}
        alt="Background"
        priority
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="container xl:max-w-[1340px] mx-auto p-0 sm:py-20 relative z-10">
        <div className="h-[1200px] overflow-hidden">
          {isClient && (
            <div className="contractor-form ml-[-60px] md:ml-0 w-[calc(100%_+_120px)] md:w-full h-full block">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/1ZE875JcOQhuASWaV8zr"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "4px",
                }}
                id="inline-1ZE875JcOQhuASWaV8zr"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Chooz Landscapers Contact Form"
                data-height="877"
                data-layout-iframe-id="inline-1ZE875JcOQhuASWaV8zr"
                data-form-id="1ZE875JcOQhuASWaV8zr"
                title="Chooz Landscapers Contact Form"></iframe>
              <script src="https://link.msgsndr.com/js/form_embed.js"></script>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
