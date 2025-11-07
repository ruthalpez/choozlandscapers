import { FaCheckCircle } from "react-icons/fa";

interface PricingCardProps {
  title: string;
  paragraph: string;
  offers: {
    title: string;
    price?: number;
    priceText?: string;
    lists: string[];
    variable?: boolean;
  }[];
}

const PricingCard = ({ title, paragraph, offers }: PricingCardProps) => {
  return (
    <div className="bg-white text-black p-3 md:p-6 mt-7">
      <div className="p-6 md:p-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="">
          <h2 className="text-[30px] md:text-[38px] font-medium mb-5 leading-10">
            {title}
          </h2>
          <p>{paragraph}</p>
        </div>
        <div className="md:min-w-[200px] lg:min-w-[400px] flex sm:justify-end items-start">
          <button className="button-pricing">Find Out More</button>
        </div>
      </div>

      {offers.map((offer, index) => (
        <div key={index} className="p-3 md:p-6 bg-[#f5f8fa] mt-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <h3 className="text-[25px] md:text-[30px] font-medium leading-8">
              {offer.title}
            </h3>
            <div className="text-[30px] md:text-[40px] font-medium">
              {typeof offer.price === "number" ? (
                <>
                  <span>${offer.price}</span>
                  <span className="text-[20px] md:text-[24px] text-[#aaa]">
                    {offer.priceText}
                  </span>
                </>
              ) : (
                <span>{offer.variable && "Variable"}</span>
              )}
            </div>
          </div>

          <ul className="flex justify-between flex-wrap gap-y-5">
            {offer.lists.map((list, index) => (
              <li
                key={index}
                className="flex items-center gap-2 w-full md:w-1/2 md:pr-5">
                <span className="text-[var(--clr-icon-check-dark)] w-[16px] h-[16px]">
                  <FaCheckCircle />
                </span>
                <span className="flex-1">{list}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingCard;
