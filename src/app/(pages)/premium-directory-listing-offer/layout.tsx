// app/premium-directory-listing-offer/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Directory Listing Offer - choozlandscapers",
  description:
    "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  keywords:
    "contact choozlandscapers, painter directory support, local landscapers contact, painting contractors help, choozlandscapers contact form",
  robots: "index, follow",
  openGraph: {
    title: "Premium Directory Listing Offer - choozlandscapers",
    description:
      "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
    url: "https://choozlandscapers.com/premium-directory-listing-offer",
    siteName: "choozlandscapers",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Premium Directory Listing Offer - choozlandscapers",
    description:
      "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  },
  alternates: {
    canonical: "https://choozlandscapers.com/premium-directory-listing-offer",
  },
};

export default function PremiumDirectoryListingOfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
