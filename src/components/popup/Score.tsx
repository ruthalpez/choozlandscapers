import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

import BadgeVerified from "@/images/badge/chooz_landscrapers_verified_landscrapers.png";
import BadgeBestAward from "@/images/badge/chooz_landscrapers_top_landscrapers.png";
import BadgeTopAward from "@/images/badge/chooz_landscrapers_best_landscrapers.png";

interface ScoreProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  score?: number;
  category?: string;
  state?: string;
  city?: string;
  slug?: string;
  platform_reviews?: number;
  review_qe?: number;
  website_dp?: number;
  business_credibility?: number;
  visit_profile?: boolean;
}

const Score = ({
  isOpen,
  setIsOpen,
  title,
  score,
  category,
  state,
  city,
  slug,
  platform_reviews,
  review_qe,
  website_dp,
  business_credibility,
  visit_profile,
}: ScoreProps) => {
  let scoreColor = "";
  if (score && score >= 94) {
    scoreColor = "bg-gradient-to-br from-[#d3b651] via-[#e2d063] to-[#d3b651]";
  } else if (score && score >= 87 && score < 94) {
    scoreColor = "bg-gradient-to-br from-[#d0cdce] via-[#eaeeed] to-[#dcdad7]";
  } else if (score && score >= 80 && score < 87) {
    scoreColor = "bg-transparent";
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-white h-[95vh] max-w-[700px]! overflow-y-auto p-0!">
        <DialogClose className="cursor-pointer ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-3 right-3 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5">
          <XIcon />
        </DialogClose>
        <DialogHeader className="bg-[#f4f4f4] px-5 pt-5 pb-10 md:p-10! ">
          <div className="rounded space-y-8">
            <DialogTitle className="text-[28px] md:text-[35px] font-extrabold text-[#2d3e54]">
              {title} Company Analysis
            </DialogTitle>
            <div className="space-y-8 text-[20px] md:text-[26px]">
              {score && (
                <div className="flex items-center flex-col md:flex-row justify-between gap-5 pb-3">
                  <h3 className="hidden md:block text-[26px] md:text-[32px] py-1 mt-3 flex-1 text-[#282b77] font-extrabold">
                    Chooz Score
                  </h3>
                  <div
                    className={`${scoreColor} space-y-3 cursor-pointer border-2 border-[#292c78] w-full sm:max-w-[305px] mb-5 rounded-xl px-4 py-2`}>
                    <div className="flex gap-4 items-center">
                      <div className="cursor-pointer flex-1 flex flex-col justify-center gap-0 text-[32px] text-[#292c78] font-extrabold min-h-[65px]">
                        <span className="block text-[20px] md:hidden">Chooz Score</span>
                        <span className="block">{score} / 100</span>
                      </div>
                      <div>
                        {score >= 94 && (
                          <Image
                            src={BadgeBestAward}
                            alt={`${title} has been given a Chooz Landscapers Best Award in gold badge in 2025`}
                            width={90}
                            height={90}
                            priority
                            className="w-[90px] h-[90px] object-contain"
                          />
                        )}
                        {score >= 87 && score < 94 && (
                          <Image
                            src={BadgeTopAward}
                            alt={`${title} has been given a Chooz Landscapers Top Award in silver badge in 2025`}
                            width={90}
                            height={90}
                            priority
                            className="w-[90px] h-[90px] object-contain"
                          />
                        )}
                        {score >= 80 && score < 87 && (
                          <Image
                            src={BadgeVerified}
                            priority
                            alt={`Chooz Landscapers Certified badge in 2025 for ${title}`}
                            width={85}
                            height={85}
                            className="w-[85px] h-[85px] object-contain p-1"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {platform_reviews && (
                <div id="platform_reviews" className="flex items-center justify-between gap-5">
                  <h3 className="py-1 mt-3 flex-1 text-[#282b77] text-[20px] md:text-[22px] font-extrabold">
                    Platform Reviews
                  </h3>
                  <div>
                    <h3 className="text-center font-poppins text-[20px] md:text-[26px] font-bold w-[110px] md:w-[135px] whitespace-nowrap border-2 border-[#282b77] bg-[#282b77] text-white px-2 py-1 rounded-md">
                      {platform_reviews} / 20
                    </h3>
                  </div>
                </div>
              )}

              {review_qe && (
                <div id="review_qe" className="flex items-center justify-between gap-5">
                  <h3 className="py-1 mt-3 flex-1 text-[#282b77] text-[20px] md:text-[22px] font-extrabold">
                    Review Quality & Engagement
                  </h3>
                  <div>
                    <h3 className="text-center font-poppins text-[20px] md:text-[26px] font-bold w-[110px] md:w-[135px] whitespace-nowrap border-2 border-[#282b77] bg-[#282b77] text-white px-2 py-1 rounded-md">
                      {review_qe} / 40
                    </h3>
                  </div>
                </div>
              )}

              {website_dp && (
                <div id="website_dp" className="flex items-center justify-between gap-5">
                  <h3 className="py-1 mt-3 flex-1 text-[#282b77] text-[20px] md:text-[22px]  font-extrabold">
                    Website & Digital Presence
                  </h3>
                  <div>
                    <h3 className="text-center font-poppins text-[20px] md:text-[26px] font-bold w-[110px] md:w-[135px] whitespace-nowrap border-2 border-[#282b77] bg-[#282b77] text-white px-2 py-1 rounded-md">
                      {website_dp} / 25
                    </h3>
                  </div>
                </div>
              )}

              {business_credibility && (
                <div id="business_credibility" className="flex items-center justify-between gap-5">
                  <h3 className="py-1 mt-3 flex-1 text-[#282b77] text-[20px] md:text-[22px] font-extrabold">
                    Business Credibility
                  </h3>
                  <div>
                    <h3 className="text-center font-poppins text-[20px] md:text-[26px] font-bold w-[110px] md:w-[135px] whitespace-nowrap border-2 border-[#282b77] bg-[#282b77] text-white px-2 py-1 rounded-md">
                      {business_credibility} / 15
                    </h3>
                  </div>
                </div>
              )}
            </div>

            {visit_profile && (
              <div className="pt-8 -ml-1">
                <p className="font-extrabold text-center md:text-left">
                  {category && state && city && slug && (
                    <Link
                      href={`/${category}/${state}/${city}/${slug}`}
                      className="text-[#282b77] hover:bg-[#282b77] hover:text-white px-2 py-1 rounded text-[20px] md:text-2xl whitespace-nowrap">
                      Visit Profile Page{" "}
                      <FaArrowRightLong className="inline ml-1" />
                    </Link>
                  )}
                </p>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="text-[17px] space-y-10 px-5 pt-8 pb-5 md:p-10">
          <div className="space-y-3">
            <h3 className="text-[22px] md:text-[28px] font-bold font-poppins text-[#2d3e54] pb-4">
              Understanding the Chooz Score
            </h3>
            <p>
              At Chooz, we believe property owners (both residential and
              commercial) deserve transparent, data-driven insights when
              selecting contractors. Our proprietary Chooz Score provides a
              comprehensive assessment that blends objective data analysis with
              subjective quality indicators of companies based on four critical
              dimensions: platform reviews and ratings, review quality and
              engagement, website and digital presence, and business credibility
              and operations.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[22px] md:text-[28px] font-bold font-poppins text-[#2d3e54] pb-4">
              Our Unique Scoring Approach: Blending Technology with Human
              Expertise
            </h3>
            <p>
              In the age of AI, we believe the most accurate and meaningful
              assessments come from combining computational analysis with human
              judgment. Our scoring process begins with sophisticated algorithms
              that analyze vast amounts of data across multiple platforms and
              metrics. However, what sets our system apart is that every score
              is then carefully reviewed and adjusted by two different human
              analysts.
            </p>
            <p>
              This blended approach ensures contextual understanding that
              algorithms alone might miss, recognition of unique circumstances
              or exceptional qualities, fair evaluation of newer businesses or
              those in transition, and identification of authentic excellence
              versus manipulated metrics.
            </p>
            <p>
              While this creates a more subjective score than purely algorithmic
              systems, we believe this human touch produces evaluations that
              better reflect the real customer experience and business quality.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[22px] md:text-[28px] font-bold font-poppins text-[#2d3e54] pb-4">
              Our Four-Pillar Scoring Framework (100 Points Total)
            </h3>
            <h4 className="text-[20px] font-poppins font-bold text-[#2d3e54]">
              1. Platform Reviews & Ratings for {title}
            </h4>
            <div className="pb-4">
              <span className="font-poppins font-bold bg-[#282b77] text-white px-3 py-2 rounded whitespace-nowrap">
                {platform_reviews && platform_reviews + " / "} 20 Points
              </span>
            </div>
            <p>
              We analyze all review data from multiple platforms including
              Google, Facebook, Yelp, Angi, Better Business Bureau, and other
              relevant review sources. Our dynamic allocation system assigns
              points based on each platform's proportion of a company's total
              review volume, ensuring fair representation regardless of where
              customers choose to share feedback.
            </p>
            <p>
              <b>How It Works:</b>
              The 20 points are distributed proportionally among platforms where
              the company has actual reviews. For example, a company with 100
              Google reviews and 20 Facebook reviews would have Google weighted
              higher than Facebook. Points awarded are based on the actual
              rating (e.g., a 4.8/5.0 rating earns 96% of possible points for
              that platform).
            </p>
            <p>
              This section evaluates the company's overall reputation across all
              platforms, reflecting their cumulative track record and current
              standing with customers.
            </p>
            <h4 className="text-[20px] font-poppins font-bold text-[#2d3e54] pt-5">
              2. Review Quality & Engagement for {title}
            </h4>
            <div className="pb-4">
              <span className="font-poppins font-bold bg-[#282b77] text-white px-3 py-2 rounded whitespace-nowrap">
                {review_qe && review_qe + " / "} 40 Points
              </span>
            </div>
            <p>
              This section represents the largest portion of our score because
              we believe the content and context of reviews matter more than
              simple star ratings. In today's fast-paced world, when someone
              takes time to write a detailed, thoughtful review with specific
              project details and photos, it typically signals truly exceptional
              service.
            </p>
            <p>
              Our comprehensive analysis focuses on recent reviews, typically
              examining the last 9 months to 2 years depending on the company's
              review volume. Companies with higher review volumes are evaluated
              over shorter timeframes (as few as 9 months), while those with
              fewer reviews are assessed over longer periods (up to 2 years).
              This adaptive approach ensures we capture sufficient data to
              provide meaningful insights while prioritizing current performance
              and service quality.
            </p>
            <p>Our analysis examines multiple critical factors including:</p>
            <p>
              <b>Review Volume & Distribution:</b>
            </p>
            <ul className="list-disc pl-5 mb-5 space-y-4">
              <li>Total number of recent reviews received</li>
              <li>
                Temporal consistency and spread across the evaluation period
              </li>
              <li>Diversity of reviewers and services mentioned</li>
              <li>Review verification and authenticity patterns</li>
            </ul>
            <p>
              <b>Review Content Quality:</b>
            </p>
            <ul className="list-disc pl-5 mb-5 space-y-4">
              <li>Professional language and service-specific terminology</li>
              <li>Depth and detail in customer feedback</li>
              <li>
                Specific information about project scope, timeline, and results
              </li>
              <li>Visual documentation of completed work</li>
              <li>Evidence of repeat customers</li>
            </ul>
            <p>
              <b>Review Engagement & Response:</b>
            </p>
            <ul className="list-disc pl-5 mb-5 space-y-4">
              <li>How often owners engage with customer feedback</li>
              <li>Professionalism and helpfulness of responses</li>
              <li>How effectively issues are addressed</li>
              <li>Volume and consistency of recent reviews</li>
            </ul>
            <p>
              <b>Authenticity & Problem Resolution</b>
            </p>
            <ul className="list-disc pl-5 mb-5 space-y-4">
              <li>Cross-platform negative review patterns and resolution</li>
              <li>How well negative reviews are addressed</li>
              <li>Customer retention indicators</li>
            </ul>

            <p>
              We understand that no company can please every customer, so a few
              negative reviews don't significantly hurt the score. What matters
              more is transparent problem resolution. The most valuable scenario
              is when issues are addressed publicly through owner responses,
              followed by corrective action and customer updates reflecting
              satisfaction with the resolution.
            </p>
            <h4 className="text-[20px] font-poppins font-bold text-[#2d3e54]  pt-5">
              3. Website & Digital Presence for {title}
            </h4>
            <div className="pb-4">
              <span className="font-poppins font-bold bg-[#282b77] text-white px-3 py-2 rounded whitespace-nowrap">
                {website_dp && website_dp + " / "} 25 Points
              </span>
            </div>
            <p>
              A company's digital presence serves as a crucial indicator of
              their professionalism, accessibility, and commitment to
              transparency. Our assessment includes:
            </p>
            <p>
              <b>Website Quality & Functionality:</b>
            </p>
            <ul className="list-disc pl-5 mb-5 space-y-4">
              <li>Active, functional website with professional design</li>
              <li>Mobile responsiveness and user experience</li>
              <li>Important pages present and functioning properly</li>
              <li>FAQ section availability</li>
              <li>SEO optimization</li>
              <li>ADA compliance</li>
              <li>Multi-page structure with clear navigation</li>
              <li>Service area information clearly displayed</li>
            </ul>
            <p>
              <b>Visual Portfolio & Communication:</b>
            </p>
            <ul className="list-disc pl-5 mb-5 space-y-4">
              <li>Project gallery with quality photos demonstrating work</li>
              <li>Contact forms for easy communication</li>
              <li>Chat widget or live support options</li>
            </ul>
            <p>
              <b>Online Presence Management:</b>
            </p>
            <ul className="list-disc pl-5 mb-5 space-y-4">
              <li>Social media profiles and activity levels</li>
              <li>
                Google Business Profile optimization (including NAP consistency,
                profile completeness, posting frequency, photo quality and
                quantity, Q&A section engagement)
              </li>
              <li>
                Citation quality and consistency across online directories
              </li>
            </ul>
            <h4 className="text-[20px] font-poppins font-bold text-[#2d3e54]  pt-5">
              4. Business Credibility & Operations for {title}
            </h4>
            <div className="pb-4">
              <span className="font-poppins font-bold bg-[#282b77] text-white px-3 py-2 rounded whitespace-nowrap">
                {business_credibility && business_credibility + " / "} 15 Points
              </span>
            </div>
            <p>
              Professional standards and business practices are essential
              indicators of reliability and long-term viability. Our assessment
              includes:
            </p>
            <p>
              <b>Communication & Engagement:</b>
            </p>
            <ul className="list-disc pl-5 mb-5 space-y-4">
              <li>Responsiveness to Chooz outreach and communication</li>
              <li>Willingness to engage and provide company information</li>
              <li>Demonstrated professionalism in interactions</li>
            </ul>
            <p>
              <b>Business Fundamentals:</b>
            </p>
            <ul className="list-disc pl-5 mb-5 space-y-4">
              <li>Years in business and operational stability</li>
              <li>
                Verified licensing status through state contractor license
                boards
              </li>
              <li>
                Insurance coverage (general liability and workers' compensation)
              </li>
            </ul>
            <p>
              <b>Industry Standards & Guarantees:</b>
            </p>
            <ul className="list-disc pl-5 mb-5 space-y-4">
              <li>
                Industry certifications (EPA RRP-certified, NATE-certified,
                manufacturer certifications, professional association
                memberships, BBB accreditation)
              </li>
              <li>Warranty and guarantee programs with clear terms</li>
            </ul>
            <p>
              We believe in developing trust through direct communication.
              Companies that respond to our outreach emails, complete their
              company profile form, and engage in a brief phone conversation
              with our team demonstrate the professionalism and transparency we
              value.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[22px] md:text-[28px] font-bold font-poppins text-[#2d3e54] pb-4">
              Excellence Recognition Program
            </h3>
            <p>
              Our badge awards recognize sustained excellence in the industry.
              We believe that all companies scoring above 80 points should be
              strongly considered by property owners, as this threshold
              represents solid performance across our evaluation criteria.
            </p>
            <p>
              <b>Best Painter Award (94-100 points):</b> Companies achieving
              this elite level receive our Best badge, representing the absolute
              pinnacle of service excellence. These companies consistently
              demonstrate exceptional performance across all evaluation
              criteria.
            </p>
            <p>
              <b>Top Painter Award (87-93 points):</b> Outstanding companies
              showing strong performance receive our Top recognition, indicating
              superior service quality and professionalism.
            </p>
            <p>
              <b>Chooz Certified Award (80-86 points):</b> Companies in this
              range have demonstrated good performance and meet our standards
              for listing. While they may not yet qualify for our higher badge
              awards, they represent reliable options for property owners and
              receive personalized feedback to help them reach the next level.
            </p>
            <p>
              <b>Score Not Listed (Below 80 points):</b> We do not publicly
              display scores below 80 points. However, if these companies want
              our assistance, we provide detailed feedback and specific
              recommendations on how they can improve their score to reach the
              80-point threshold and join our listed contractors.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[22px] md:text-[28px] font-bold font-poppins text-[#2d3e54] pb-4">
              Partnership for Continuous Improvement
            </h3>
            <p>
              We actively collaborate with companies to help them understand and
              enhance their scores. Our team provides specific guidance because
              we've found that higher Chooz Scores directly correlate with
              increased business revenue, higher customer satisfaction rates,
              stronger market positioning, and more sustainable business growth.
            </p>
            <p>
              Companies with top scores consistently demonstrate superior
              customer service that inspires detailed positive reviews,
              professional business practices that build lasting trust, quality
              workmanship that customers enthusiastically recommend, responsive
              communication and effective problem resolution, and active
              engagement with industry best practices.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[22px] md:text-[28px] font-bold font-poppins text-[#2d3e54] pb-4">
              The Chooz Commitment
            </h3>
            <p>
              The Chooz Score represents more than just a number—it's our
              commitment to helping property owners find exceptional contractors
              with confidence, supporting quality businesses in standing out
              from competitors, promoting transparency and accountability in the
              industry, fostering genuine relationships between contractors and
              our platform, and encouraging continuous improvement and
              professional development.
            </p>
            <p>
              By combining comprehensive data analysis with human expertise and
              direct business engagement, we create a transparent pathway to
              excellence that benefits everyone. Our blended approach ensures
              that deserving companies receive recognition while property owners
              gain access to thoroughly vetted, high-quality professionals.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Score;
