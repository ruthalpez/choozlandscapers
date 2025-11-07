"use client";

import { useEffect } from "react";

const JsonLdHead = ({ jsonLd }: { jsonLd: Record<string, any> }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [jsonLd]);

  return null;
};

export default JsonLdHead;
