// app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - choozlandscapers",
  description:
    "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  keywords:
    "contact choozlandscapers, painter directory support, local landscapers contact, painting contractors help, choozlandscapers contact form",
  robots: "index, follow",
  openGraph: {
    title: "About - choozlandscapers",
    description:
      "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
    url: "https://choozlandscapers.com/about",
    siteName: "choozlandscapers",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About - choozlandscapers",
    description:
      "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  },
  alternates: {
    canonical: "https://choozlandscapers.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
