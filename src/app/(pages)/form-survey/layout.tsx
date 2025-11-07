// app/form-survey/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Survey - choozlandscapers",
  description:
    "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  keywords:
    "contact choozlandscapers, painter directory support, local landscapers contact, painting contractors help, choozlandscapers contact form",
  robots: "index, follow",
  openGraph: {
    title: "Form Survey - choozlandscapers",
    description:
      "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
    url: "https://choozlandscapers.com/form-survey",
    siteName: "choozlandscapers",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Form Survey - choozlandscapers",
    description:
      "Get in touch with choozlandscapers. Contact us for support, questions about our painter directory, or assistance finding local painting contractors in your area.",
  },
  alternates: {
    canonical: "https://choozlandscapers.com/form-survey",
  },
};

export default function FormSurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
