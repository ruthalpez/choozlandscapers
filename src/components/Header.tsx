"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/logo/choz_landscrapers_header_logo_1.png";
import { FiPlus } from "react-icons/fi";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDevice } from "@/hooks/useDevice";
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const MenuList = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Scoring", href: "/score-methodology" },
  { label: "Articles", href: "/blog" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useDevice();
  const pathname = usePathname();

  const isDynamicPage = /^\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/[^/]+$/.test(pathname);

  const pathNameHideButton =
    pathname === "/claim-painting-contractor" ||
    !["/", "/about", "/contact", "/blog"].includes(pathname) ||
    isDynamicPage;

  return (
    <header className="sticky top-0 z-50 bg-gray-50 flex items-center">
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-5 px-5 py-4">
          <Link href={"/"} prefetch={false} className="cursor-pointer md:ml-5">
            <Image
              src={Logo.src}
              alt="Chooz Landscapers logo"
              width={130}
              height={100}
              priority
              className="w-[130px]"
            />
          </Link>
          <div className="flex items-center gap-6">
            {!isMobile && (
              <nav className="flex items-center">
                {MenuList.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    prefetch={false}
                    className="block font-medium rounded text-gray-700 hover:text-white hover:bg-(--clr-primary) px-[15px] w-full transition-all duration-300 ease-in-out py-1"
                    onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}

            {isMobile && (
              <>
                <Link
                  href="/free-directory-listing-offer"
                  prefetch={false}
                  className="text-[21px]">
                  <FiPlus />
                </Link>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button
                      className="p-2 focus:outline-none cursor-pointer"
                      aria-label="Toggle menu">
                      <Menu className="h-6 w-6 text-gray-700" />
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[80%] sm:w-[350px] pt-12 bg-white">
                    <SheetHeader className="p-0!">
                      <SheetTitle className="sr-only">
                        Navigation Menu
                      </SheetTitle>
                    </SheetHeader>
                    <nav className="px-3">
                      {MenuList.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          prefetch={false}
                          className="block font-medium rounded text-gray-700 hover:text-white hover:bg-(--clr-primary) hover:pl-[20px] px-[15px] w-full transition-all duration-300 ease-in-out py-2"
                          onClick={() => setIsOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                      <div className="flex items-center gap-4 mt-4 ml-4">
                        <a
                          href="https://www.facebook.com/profile.php?id=61573089310812"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-80">
                          <FaFacebook className="w-6 h-6" />
                        </a>
                        <a
                          href="https://www.instagram.com/chooz_landscapers/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-80">
                          <FaInstagram className="w-6 h-6" />
                        </a>
                      </div>
                      {isMobile && (
                        <Link
                          href="/free-directory-listing-offer"
                          prefetch={false}
                          className="button-primary bg-[#ffff00]! border-[#ffff00]! flex items-center gap-2 mt-10">
                          <FiPlus />
                          <span>Landscapers, Claim Free Listing</span>
                        </Link>
                      )}
                    </nav>
                  </SheetContent>
                </Sheet>
              </>
            )}

            {!isMobile && pathname !== "/free-directory-listing-offer" && (
              <Link
                href="/free-directory-listing-offer"
                prefetch={false}
                className="flex items-center gap-2 border border-black text-black py-3 md:py-1 px-3 text-[19px] lg:text-[20px] rounded font-medium">
                <FiPlus />
                <span>Claim Free Listing</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
