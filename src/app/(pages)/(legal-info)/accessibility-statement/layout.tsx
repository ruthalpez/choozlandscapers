// app/(pages)/(legal-info)/accessibility-statement/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement - choozlandscapers",
  description:
    "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  keywords:
    "contact choozlandscapers, painter directory support, local landscapers contact, painting contractors help, choozlandscapers contact form",
  robots: "index, follow",
  openGraph: {
    title: "Accessibility Statement - choozlandscapers",
    description:
      "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
    url: "https://choozlandscapers.com/accessibility-statement",
    siteName: "choozlandscapers",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Accessibility Statement - choozlandscapers",
    description:
      "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  },
  alternates: {
    canonical: "https://choozlandscapers.com/accessibility-statement",
  },
};

export default function AccessibilityStatementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
