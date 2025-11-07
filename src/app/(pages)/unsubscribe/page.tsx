import React from "react";

const page = () => {
  return (
    <main className="primary-bg-gradient text-white">
      <div className="container xl:max-w-[1340px] mx-auto px-5 py-10 md:py-20">
        <div className="">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/rFvLKUCadF6OhFeIuL70"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "3px",
            }}
            id="inline-rFvLKUCadF6OhFeIuL70"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Unsubscribe Form"
            data-height="432"
            data-layout-iframe-id="inline-rFvLKUCadF6OhFeIuL70"
            data-form-id="rFvLKUCadF6OhFeIuL70"
            title="Unsubscribe Form"></iframe>
          <script src="https://link.msgsndr.com/js/form_embed.js"></script>
        </div>
      </div>
    </main>
  );
};

export default page;
