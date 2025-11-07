// app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim Your Painting Contractor Listing - choozlandscapers",
  description:
    "Claim your painting contractor listing on choozlandscapers. Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  keywords:
    "contact choozlandscapers, painter directory support, local landscapers contact, painting contractors help, choozlandscapers contact form",
  robots: "index, follow",
  openGraph: {
    title: "Claim Your Painting Contractor Listing - choozlandscapers",
    description:
      "Claim your painting contractor listing on choozlandscapers. Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
    url: "https://choozlandscapers.com/contact",
    siteName: "choozlandscapers",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Claim Your Painting Contractor Listing - choozlandscapers",
    description:
      "Claim your painting contractor listing on choozlandscapers. Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  },
  alternates: {
    canonical: "https://choozlandscapers.com/claim-painting-contractor",
  },
};

export default function ClaimPaintingContractorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
