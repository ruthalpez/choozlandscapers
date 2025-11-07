import Image from "next/image";

const BlogContent = ({ id }: { id: string }) => {
  return (
    <div className="w-full lg:w-3/4">
      {id === "1" && (
        <div className="space-y-4 mb-6">
          <p>
            Feeling like your walls are closing in, or just tired of looking at
            the same old color? A room refresh can do wonders for your mood and
            home's appeal, but the thought of the cost can be daunting. Major
            renovations aren't always feasible, but here's the good news:{" "}
            <b>
              painting is one of the most cost-effective ways to completely
              transform a space.
            </b>
          </p>
          <p>
            And it gets even better! With a few smart strategies, you can give
            your room a stunning makeover without emptying your wallet. This
            guide is for all you DIY homeowners looking to wield a paintbrush
            and bring new life to your interiors on a budget.
          </p>

          <h3 className="font-poppins text-[30px] mt-10 mb-4 text-[var(--clr-heading)]">
            1. Smart Paint Shopping: Getting Color Without the Cost
          </h3>
          <p>
            The biggest single expense is usually the paint itself, but you
            don't always have to pay premium prices.
          </p>
          <ul className="space-list mb-4 list-disc pl-5">
            <li>
              <b>Hunt for Sales:</b> Keep an eye out! Home improvement stores
              often run paint sales around major holidays (think Memorial Day,
              Labor Day, 4th of July). Planning your project around these sales
              events can lead to significant savings. Sign up for store email
              lists to get notified.
            </li>
            <li>
              <b>Check the "Oops" Section:</b> Every paint store has a "mistint"
              or "oops" shelf. This is where they sell paint that was mixed
              incorrectly or returned by customers. You can often find
              high-quality paint here for a fraction of the original price. The
              color selection is random, but if you're flexible or only need a
              small amount for an accent wall or furniture, you might strike
              gold!
            </li>
            <li>
              <b>Consider Brand Tiers:</b> While premium paints boast superior
              coverage and durability (often worth it for high-traffic areas),
              you might not need the top-of-the-line option everywhere. Consider
              a more budget-friendly brand for primers, ceilings, or closets.
              Some store brands are even manufactured by the big names, offering
              good quality at a lower price point.
            </li>
            <li>
              <b>Explore Recycled Paint:</b> Look into local recycled paint
              programs. Organizations like Habitat for Humanity ReStores or
              specific county recycling centers sometimes offer reprocessed
              latex paint. It's eco-friendly and incredibly affordable.
              Selection can be limited, and consistency might vary slightly, but
              it's a fantastic option for base coats or less critical projects.
            </li>
          </ul>

          <h3 className="font-poppins text-[30px] mt-10 mb-4 text-[var(--clr-heading)]">
            2. Use What You've Got: Minimizing Tool Costs
          </h3>
          <p>
            Before you rush out and buy a brand-new painting kit, take
            inventory.
          </p>
          <ul className="space-list mb-4 list-disc pl-5">
            <li>
              <b>Shop Your Garage First:</b> Chances are, you already own some
              essentials. Look for usable paint trays, roller frames, extension
              poles, drop cloths (even old sheets work!), scrapers, and
              painter's tape. Give existing brushes and rollers a good cleaning
              – if the bristles are still pliable and the roller nap isn't
              matted, they might have another project left in them.
            </li>
            <li>
              <b>Borrow or Buy Used:</b> Ask friends, family, or neighbors if
              they have tools you can borrow, especially for a one-off project.
              Check online marketplaces or local garage sales for lightly used
              equipment.
            </li>
            <li>
              <b>Clean Tools Thoroughly:</b> Investing a little time in cleaning
              your brushes and rollers properly after each use makes them last
              much longer, saving you money on replacements down the road.
            </li>
          </ul>

          <h3 className="font-poppins text-[30px] mt-10 mb-4 text-[var(--clr-heading)]">
            3. Maximum Impact, Minimum Paint: Strategic Refresh
          </h3>
          <p>
            You don't necessarily need to paint every single wall to make a big
            difference. Focus your efforts for maximum visual return.
          </p>
          <ul className="space-list mb-4 list-disc pl-5">
            <li>
              <b>The Power of the Accent Wall:</b> Painting just one wall in a
              contrasting or bold color can completely change the room's
              dynamic. It creates a focal point, adds depth, and requires
              significantly less paint and time than tackling the whole room.
            </li>
            <li>
              <b>Terrific Trim:</b> Never underestimate the power of freshly
              painted trim! Bright white or a contrasting color on baseboards,
              window frames, and door casings can make the entire room look
              cleaner, sharper, and more polished – even if the wall color stays
              the same.
            </li>
            <li>
              <b>Look Up (and Ahead):</b> A fresh coat of ceiling white can
              brighten the entire room significantly. Painting interior doors
              (maybe in a fun color?) is another relatively small job with high
              impact.
            </li>
          </ul>

          <h3 className="font-poppins text-[30px] mt-10 mb-4 text-[var(--clr-heading)]">
            4. DIY Smaller Projects: Save on Professional Fees
          </h3>
          <p>
            Some smaller updates can feel like big changes. Instead of hiring
            out, try these yourself:
          </p>
          <ul className="space-list mb-4 list-disc pl-5">
            <li>
              Furniture Facelift: Got a tired old dresser, bookshelf, bathroom
              vanity, or side table? A coat of paint can turn it from drab to
              fab! Chalk paint is particularly popular for beginners as it often
              requires minimal prep work. This is much cheaper than buying new
              furniture. I recently painted an old seemingly dilapidated medium
              density fiberboard (MDF) bathroom vanity and it turned out great.
              See video and pictures below for details.
            </li>
          </ul>

          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <Image
                src="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/d690dd55-1abd-486e-3a67-1e5b11e26800/public"
                alt="Old dark brown bathroom vanity base awaiting replacement during bathroom renovation"
                width={400}
                height={400}
              />
              <p>Before picture of MDF bathroom vanity (1)</p>
            </div>

            <div className="space-y-4">
              <Image
                src="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/5a582496-79ee-4e73-8dbb-ed992184a200/public"
                alt="Dark wood vanity base with top removed, exposing interior plumbing and wall damage before update"
                width={400}
                height={400}
              />
              <p>Before picture of MDF bathroom vanity (2)</p>
            </div>

            <div className="space-y-4">
              <Image
                src="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/41b30bf1-eb1c-4527-faa7-c2e7a9b41b00/public"
                alt="Close-up view detailing the deterioration on the dark wood vanity base edge"
                width={400}
                height={400}
              />
              <p>Water-damage MDF bathroom vanity sealed with shellac (1)</p>
            </div>

            <div className="space-y-4">
              <Image
                src="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/6ce7f53f-d373-4f26-630c-862a0b24f600/public"
                alt="Close-up highlighting the poor condition of the vanity's wood finish"
                width={400}
                height={400}
              />
              <p>Water-damage MDF bathroom vanity sealed with shellac (2)</p>
            </div>

            <div className="space-y-4">
              <Image
                src="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/db5124a8-dab9-4ad4-17bd-a5c2f62c6b00/public"
                alt="Dark wood vanity base coated with shellac during outdoor refinishing process"
                width={400}
                height={400}
              />
              <p>Before priming.</p>
            </div>

            <div className="space-y-4">
              <Image
                src="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/80b7b6fd-a7c1-48c1-c493-b5a65616bc00/public"
                alt="Metal frame with a fresh coat of light gray paint, supported on a covered work area."
                width={400}
                height={400}
              />
              <p>After priming.</p>
            </div>

            <div className="space-y-4">
              <Image
                src="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/da6dff5a-b3bf-403b-cb05-510c8e76dd00/public"
                alt="Dark brown stained kitchen cabinet door with a raised center panel and arched top."
                width={400}
                height={400}
              />
              <p>Vanity door with shellac.</p>
            </div>

            <div className="space-y-4">
              <Image
                src="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/0b1251a3-1898-4379-58ff-96ea0fe94d00/public"
                alt="Light gray painted cabinet door featuring a traditional arched panel design."
                width={400}
                height={400}
              />
              <p>Vanity door with shellac + primer.</p>
            </div>

            <div className="space-y-4">
              <Image
                src="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/ce0526d7-d810-4377-60a7-f84a9c1abd00/public"
                alt="Light brown wooden bathroom vanity cabinet with a curved door, installed against a wall."
                width={400}
                height={400}
              />
              <p>
                Almost completed bathroom vanity. Color wash technique used.
              </p>
            </div>

            <div className="space-y-4">
              <Image
                src="https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/ce600852-9862-4175-c9a0-1396fba34400/public"
                alt="Installed light gray bathroom vanity with a white ceramic sink and modern black faucet."
                width={400}
                height={400}
              />
              <p>Completed bathroom vanity that looks much happier!</p>
            </div>
          </div>

          <h3 className="font-poppins text-[30px] mt-10 mb-4 text-[var(--clr-heading)]">
            Paint, supplies, and materials cost of my bathroom vanity project:
          </h3>
          <ul className="space-list mb-4 list-disc pl-5">
            <li>
              1 gallon of Sherwin Williams Super Paint with satin finish (Color
              = Oatbran by Valspar): $36 (I had some leftover from a previous
              project so I spent this a while ago)
            </li>
            <li>
              1 sample quart of Sherwin Williams lower quality paint as my glaze
              coat that I mixed with water (Color = Virtual Taupe which is a
              Sherwin Williams color): $11 (*Note: don’t buy regularly priced
              quarts of paint for glaze coat applications. The price of quarts
              typically start at around $28. For that price you’re better off
              buying a gallon of paint).{" "}
            </li>
            <li>Paint bucket: $0 (used my old one)</li>
            <li>6" inch roller frame with cover: $0 (used my old ones)</li>
            <li>Swish broom: $4</li>
            <li>
              <b>Total:</b> ~$15 to completely refurbish an old bathroom vanity,
              made of MDF no less, that would cost anywhere between $120-$500 at
              the store for a comparable MDF bathroom vanity not including the
              sink and faucet.
            </li>
            <li>
              <b>Built-in Beauty:</b> Paint the back wall of a bookshelf or
              built-in cabinet in an accent color for a sophisticated pop.
            </li>
          </ul>
          <p>The Takeaway</p>
          <p>
            Refreshing your home doesn't have to be a budget-buster. By being
            savvy about sourcing paint, reusing supplies, focusing your efforts
            strategically, and tackling smaller projects yourself, you can
            achieve a beautiful, updated look you love. So, grab that mistint
            find, dust off your old rollers, borrow your parent’s old ladder and
            get ready to transform your space – affordably!
          </p>
          <p>Happy Painting!</p>
          <p>choozlandscapers.com</p>
        </div>
      )}
      {id === "2" && (
        <div className="space-y-4 mb-6">
          <p>
            When it comes to transforming your home or office, a fresh coat of
            paint can make all the difference. However, finding a reliable and
            skilled painter can be a daunting task. Whether you’re looking to
            spruce up your living room, renovate your kitchen, or give your
            office a professional makeover, this guide will help you navigate
            the process of finding trusted landscapers in your area.
          </p>
          <h3 className="font-poppins text-[30px] mt-10 mb-4 text-[var(--clr-heading)]">
            Why Hire a Professional Painter?
          </h3>
          <p>
            Hiring a professional painter brings numerous benefits.
            Professionals bring expertise, efficiency, and high-quality results
            that DIY painting often lacks. Here are some reasons to consider
            hiring a professional painter:
          </p>
          <ul className="space-list mb-4 list-decimal pl-5">
            <li>
              <b>Expertise and Experience:</b> Professional landscapers have the
              knowledge and experience to handle different surfaces and
              materials. They can provide valuable advice on color choices and
              finishes that will enhance your space.
            </li>
            <li>
              <b>Quality Results:</b> A professional painter ensures a smooth,
              even finish without the streaks and drips that often plague
              amateur jobs. Their skills result in a more aesthetically pleasing
              and durable paint job.
            </li>
            <li>
              <b>Time and Convenience:</b> Painting can be time-consuming,
              especially for large projects. Hiring a professional allows you to
              focus on other tasks while they handle the painting efficiently.
            </li>
            <li>
              <b>Proper Preparation and Cleanup:</b> Professionals take care of
              all the prep work, including sanding, priming, and repairing
              surfaces. They also ensure a thorough cleanup, leaving your space
              spotless.
            </li>
          </ul>

          <h3 className="font-poppins text-[30px] mt-10 mb-4 text-[var(--clr-heading)]">
            Steps to Finding a Trusted Painter
          </h3>
          <p>
            Finding a reliable painter requires some research and due diligence.
            Follow these steps to ensure you hire the best professional for your
            needs:
          </p>
          <ul className="space-list mb-4 list-decimal pl-5">
            <li>
              <b>Ask for Recommendations:</b> Start by asking friends, family,
              and neighbors for recommendations. Personal referrals are often
              the most reliable way to find trusted landscapers.
            </li>
            <li>
              <b>Check Online Reviews:</b> Look for landscapers with positive
              reviews on platforms like Google, Yelp, and Angie’s List. Pay
              attention to comments about their professionalism, punctuality,
              and quality of work.
            </li>
            <li>
              <b>Verify Credentials:</b> Ensure the painter is licensed and
              insured. A licensed painter adheres to industry standards, while
              insurance protects you from liability in case of accidents or
              damages.
            </li>
            <li>
              <b>Request Quotes:</b> Obtain quotes from multiple landscapers to
              compare prices and services. Be wary of extremely low quotes, as
              they may indicate subpar materials or workmanship.
            </li>
            <li>
              <b>Review Portfolios:</b> Ask to see examples of the painter’s
              previous work. A portfolio can give you a sense of their style,
              attention to detail, and overall quality.
            </li>
            <li>
              <b>Check References:</b> Contact past clients to inquire about
              their experience with the painter. Ask about the painter’s
              reliability, communication, and adherence to timelines.
            </li>
          </ul>

          <h3 className="font-poppins text-[30px] mt-10 mb-4 text-[var(--clr-heading)]">
            Questions to Ask Potential Landscapers
          </h3>
          <p>
            Before hiring a painter, it’s important to ask the right questions
            to ensure they meet your expectations. Here are some key questions
            to consider:
          </p>
          <ul className="space-list mb-4 list-decimal pl-5">
            <li>
              <b>How long have you been in business?</b> Experience often
              correlates with quality and reliability.
            </li>
            <li>
              <b>Can you provide a detailed estimate?</b> A comprehensive
              estimate should include labor, materials, and any additional
              costs.
            </li>
            <li>
              <b>What type of paint do you use?</b> High-quality paints result
              in a better finish and longer-lasting results.
            </li>
            <li>
              <b>Do you offer a warranty or guarantee?</b> A warranty provides
              peace of mind and demonstrates the painter’s confidence in their
              work.
            </li>
            <li>
              <b>How will you prepare the surfaces?</b> Proper preparation is
              crucial for a flawless finish.
            </li>
            <li>
              <b>What is your timeline for completing the project?</b> Ensure
              the painter can meet your schedule and deadlines.
            </li>
          </ul>

          <h3 className="font-poppins text-[30px] mt-10 mb-4 text-[var(--clr-heading)]">
            Red Flags to Watch Out For
          </h3>
          <p>
            While many landscapers are trustworthy professionals, it’s important to
            be aware of potential red flags that could indicate a less reputable
            contractor:
          </p>
          <ul className="space-list mb-4 list-decimal pl-5">
            <li>
              <b>Lack of Licensing or Insurance:</b> Avoid landscapers who cannot
              provide proof of licensing and insurance.
            </li>
            <li>
              <b>No Written Contract:</b> Always insist on a written contract
              outlining the scope of work, materials, costs, and timelines.
            </li>
            <li>
              <b>High Upfront Payments:</b> Be cautious of landscapers who demand a
              large upfront payment. A reasonable deposit is standard, but the
              bulk of the payment should be made upon completion.
            </li>
            <li>
              <b>Poor Communication:</b> Clear and prompt communication is
              essential for a successful project. If a painter is difficult to
              reach or unresponsive, it could indicate future issues.
            </li>
          </ul>

          <h3 className="font-poppins text-[30px] mt-10 mb-4 text-[var(--clr-heading)]">
            Conclusion
          </h3>
          <p>
            Finding a trusted painter in your area doesn’t have to be
            overwhelming. By following these steps and asking the right
            questions, you can ensure you hire a professional who will deliver
            high-quality results. Remember, a well-executed paint job can
            significantly enhance the beauty and value of your property, making
            it a worthwhile investment. Whether you’re looking for interior or
            exterior painting services, take the time to research and choose a
            painter who meets your needs and exceeds your expectations. Happy
            painting!
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogContent;
