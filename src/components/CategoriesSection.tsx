import Image from "next/image";

import Image1 from "@/images/categories/chooz_lanscrapers_lawn_care.png";
import Image2 from "@/images/categories/chooz_lanscrapers_landscccape_lighting_installation.png";
import Image3 from "@/images/categories/chooz_lanscrapers_tree_and_shrub_care.png";
import Image4 from "@/images/categories/chooz_lanscrapers_TRactor_and_heavy_equipment_landscapingpng.png";
import Image5 from "@/images/categories/chooz_lanscrapers_hedge_trmming_and_prunning.png";
import Image6 from "@/images/categories/chooz_lanscrapers_snoe_removal_services.png";

const categories = [
  {
    title: "Lawn Care & Mowing",
    image: Image1,
    alt: "Icon of a lawn care",
    link: "lawn-care-mowing",
  },
  {
    title: "Landscape Lighting Installation",
    image: Image2,
    alt: "Icon of a landscape lighting installation",
    link: "landscape-lighting-installation",
  },
  {
    title: "Tree & Shrub Care",
    image: Image3,
    alt: "Icon of a tree & shrub care",
    link: "tree-shrub-care",
  },
  {
    title: "Tractor and Heavy Equipment Landscaping",
    image: Image4,
    alt: "Icon of a tractor and heavy equipment landscaping",
    link: "tractor-and-heavy-equipment-landscaping",
  },
  {
    title: "Hedge Trimming & Prunning",
    image: Image5,
    alt: "Icon of a hedge trimming & prunning",
    link: "hedge-trimming-and-prunning",
  },
  {
    title: "Snow Removal Services",
    image: Image6,
    alt: "Icon of a snow removal services",
    link: "snow-removal-services",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center md:justify-between w-full sm:max-w-[500px] lg:max-w-[1340px] mx-auto">
      {categories.map((category, index) => (
        <div
          key={index}
          className="bg-white text-center p-[15px] md:shadow-sm w-[calc(50%-12px)] md:w-[130px] md:border border-gray-100 rounded-xl">
          <Image
            src={category.image}
            alt={category.title}
            width={100}
            height={100}
            className="w-full h-[55px] md:h-[45px] object-contain mb-3"
          />
          <p className="text-base md:text-sm font-semibold text-center">
            {category.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSection;
