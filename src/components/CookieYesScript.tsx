"use client";

import { useEffect } from "react";

const CookieYesScript = () => {
  useEffect(() => {
    const existingScript = document.getElementById("cookieyes");
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = "cookieyes";
    script.type = "text/javascript";
    script.src = "https://cdn-cookieyes.com/client_data/25ce847270be47a7d3064983/script.js";
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const addedScript = document.getElementById("cookieyes");
      if (addedScript) {
        document.body.removeChild(addedScript);
      }
    };
  }, []);

  return null;
};

export default CookieYesScript;
