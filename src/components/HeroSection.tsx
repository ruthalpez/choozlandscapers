"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  detectLocationWithFallback,
  LocationResult,
} from "@/utils/detectLocation";
import MainImage from "@/images/background/chooz_landscapers_header-1.png";
import BackgroundImage from "@/images/background/chooz_landscrapers_header-wallpaper.png";
import SearchList from "./SearchList";
import { useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { useLandscapers } from "@/context/PaintersContext";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationResult | null>(
    null,
  );
  const router = useRouter();
  const { allZipCodesData } = useLandscapers();

  useEffect(() => {
    if (allZipCodesData && allZipCodesData.length > 0) {
      // Group by state for better organization
      const zipsByState = allZipCodesData.reduce((acc, zipData) => {
        const state = zipData.state;
        if (!acc[state]) {
          acc[state] = [];
        }
        acc[state].push({
          zip: zipData.zip,
          city: zipData.city,
        });
        return acc;
      }, {} as Record<string, { zip: string; city: string }[]>);
    } else {
      console.log("No ZIP codes available or still loading...");
    }
  }, [allZipCodesData]);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const userLocation = await detectLocationWithFallback();

        if (userLocation) {
          setCurrentLocation(userLocation);
          setSearchTerm(userLocation.displayText);
          console.log("User location set:", userLocation.displayText);
        } else {
          console.warn("Failed to detect user location");
        }
      } catch (err) {
        console.error("Failed to detect location", err);
      }
    };

    getUserLocation();
  }, []);

  const findZipCodeMatch = (zipCode: string) => {
    if (!allZipCodesData || allZipCodesData.length === 0) {
      console.log("No ZIP code data available");
      return null;
    }

    const match = allZipCodesData.find((zipData) => zipData.zip === zipCode);

    if (match) {
      // Convert city and state to URL-friendly format
      const citySlug = match.city
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      const stateSlug = match.state
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      return {
        url: `/${stateSlug}/${citySlug}/painting-contractors`,
        city: match.city,
        state: match.state,
        zip: match.zip,
      };
    }

    return null;
  };

  // Enhanced search navigation that handles different input types
  const handleSearchNavigate = async (term: string) => {
    if (!term.trim()) return;

    const trimmedTerm = term.trim();

    // Check if it's a ZIP code (5 digits)
    if (/^\d{5}$/.test(trimmedTerm)) {
      const zipMatch = findZipCodeMatch(trimmedTerm);

      if (zipMatch) {
        setShowSuggestions(false);
        router.push(zipMatch.url);
        return;
      } else {
        alert(
          `Sorry, we don't have landscapers available in ZIP code ${trimmedTerm} yet.`,
        );
        return;
      }
    }

    if (currentLocation && trimmedTerm === currentLocation.displayText) {
      const zipMatch = findZipCodeMatch(currentLocation.zipCode);
      if (zipMatch) {
        setShowSuggestions(false);
        router.push(zipMatch.url);
        return;
      }
    }

    console.log("Non-ZIP search term:", trimmedTerm);
  };

  return (
    <div className="min-h-[670px] primary-bg-gradient text-white relative pb-50 lg:pb-0 pt-15 lg:pt-26">
      <Image
        src={BackgroundImage}
        alt="Seamless black and white pattern featuring icons of lawn mowers, trees, street lamps, pliers, tractors, houses, and landscaping trucks representing home exterior services like landscaping and HVAC maintenance."
        priority
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="container xl:max-w-[1100px] mx-auto px-5 md:pt-5 relative z-20">
        <h1 className="text-[45px] lg:text-[65px] font-bold leading-14 mb-5 font-poppins">
          Looking for a Landscaper?
        </h1>
        <p className="text-[20px] lg:text-[35px] font-medium font-poppins">
          Find the best landscapers near you
        </p>
        <div className="flex flex-col lg:flex-row justify-between gap-20 lg:gap-40">
          <div className="w-full lg:w-1/2">
            <div className="main-search mb-2! flex mt-10 lg:mt-20 ">
              <div className="flex-1 space-y-4">
                <div className="relative">
                  <SearchList
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                    handleSearchNavigate={handleSearchNavigate}
                    inputClass="flex-1 border-none shadow-none outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={() => {
                  if (/^\d{5}$/.test(searchTerm.trim())) {
                    handleSearchNavigate(searchTerm.trim());
                  }
                }}
                disabled={!/^\d{5}$/.test(searchTerm.trim())}
                className={`main-search-submit ml-2 ${
                  /^\d{5}$/.test(searchTerm.trim())
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
                aria-label="Search">
                <IoSearchOutline />
              </button>
            </div>
            <p className="text-[13px] pl-4">Search by City or Zip code</p>
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <Image
              src={MainImage}
              alt="Smiling landscaper standing beside a residential home and branded landscapers truck and trailer, representing professional landscaping services"
              width={600}
              height={600}
              priority
              className="max-w-[500px] w-[70%] lg:w-full -mt-5"
            />
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-0 w-full bg-(--clr-primary) text-white py-5 px-10 mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 z-10">
        <p className="m-0! text-lg sm:text-[25px] font-bold text-center">
          Want us to do the work for you and find you the best paiting
          contractor?
        </p>
        <Link
          href="/form-survey"
          className="w-full sm:w-auto bg-[#ffff00] text-(--clr-primary) font-bold py-1 px-12 rounded-lg flex flex-col items-center">
          <span>Get Started</span>
          <span className="text-[12px]">FREE SERVICE</span>
        </Link>
      </div> */}
    </div>
  );
};

export default HeroSection;
