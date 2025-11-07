import { Contractor } from "@/type/contractor";
import { normalizeState } from "@/data/normalizeState";

interface ContractorListHeadingProps {
  contractors: Contractor[];
  total: number;
  city: string;
  state: string;
}

const ContractorListHeading = ({
  contractors,
  total,
  city,
  state,
}: ContractorListHeadingProps) => {
  return (
    <div className="px-3">
      <h1 className="text-[32px] mb-3 leading-10 lg:leading-15 text-(--clr-heading-2) font-bold font-poppins">
        {(city ?? "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())}
        , {normalizeState(state || "").toUpperCase()} Painting Contractors
      </h1>

      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4">
        <p>
          <span className="font-bold">Showing {total}</span>{" "}
          {total === 1 ? "painter" : "landscapers"} servicing{" "}
          {city
            ? city
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())
            : ""}
          , {normalizeState(state || "").toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default ContractorListHeading;
