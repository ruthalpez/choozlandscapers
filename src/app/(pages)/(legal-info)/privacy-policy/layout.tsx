// app/(pages)/(legal-info)/privacy-policy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - choozlandscapers",
  description:
    "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  keywords:
    "contact choozlandscapers, painter directory support, local landscapers contact, painting contractors help, choozlandscapers contact form",
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy - choozlandscapers",
    description:
      "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
    url: "https://choozlandscapers.com/privacy-policy",
    siteName: "choozlandscapers",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - choozlandscapers",
    description:
      "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  },
  alternates: {
    canonical: "https://choozlandscapers.com/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
