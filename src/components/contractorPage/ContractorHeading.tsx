import Link from "next/link";

import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import { IoLogoGoogleplus } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { Contractor } from "@/type/contractor";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoShareSocialSharp } from "react-icons/io5";
import Image from "next/image";
import { useDevice } from "@/hooks/useDevice";
import { Label } from "../ui/label";

interface ContractorHeadingProps {
  contractor: Contractor;
}

const ContractorHeading = ({ contractor }: ContractorHeadingProps) => {
  return (
    <>
      <h1 className="text-[32px] mb-3 leading-10 lg:leading-12 text-(--clr-heading-2) font-bold font-poppins flex flex-col gap-2">
        {contractor.title}
      </h1>

      <div className={`flex flex-wrap items-center mb-8 gap-3`}>
        {(contractor.claimed || contractor.not_claimed) &&
          contractor.facebook && (
            <Link
              href={contractor.facebook}
              target="_blank"
              className="button-secondary-reverse"
              aria-label="Facebook">
              <FaFacebookF className="text-base" />
            </Link>
          )}
        {(contractor.claimed || contractor.not_claimed) &&
          contractor.instagram && (
            <Link
              href={contractor.instagram}
              target="_blank"
              className="button-secondary-reverse"
              aria-label="Instagram">
              <FaInstagram className="text-base" />
            </Link>
          )}
        {(contractor.claimed || contractor.not_claimed) &&
          contractor.google_bp && (
            <Link
              href={contractor.google_bp}
              target="_blank"
              className="button-secondary-reverse"
              aria-label="Google Business Profile">
              <IoLogoGoogleplus className="text-2xl" />
            </Link>
          )}

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center gap-2">
            <IoShareSocialSharp className="text-base" />
            <span>Share</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-gray-300">
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              Facebook
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              Twitter
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              LinkedIn
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              Instagram
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default ContractorHeading;
