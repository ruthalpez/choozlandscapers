"use client";

import { useState } from "react";
import SearchList from "../SearchList";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ServicesFilter from "../ServicesFilter";
import { useDevice } from "@/hooks/useDevice";
import { IoSearch } from "react-icons/io5";
import { FiFilter, FiX } from "react-icons/fi";

interface ContractorListSearchProps {
  getZipMatch?: (
    term: string,
  ) => { city: string | undefined; state: string; url: string } | null;
  getZipMatchAsync?: (
    term: string,
  ) => Promise<{ city: string; state: string; url: string } | null>;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  sortByRating: string;
  setSortByRating: any;
  serviceFilter: string;
  setServiceFilter: (serviceFilter: string) => void;
  zipCodes: any[];
}

const ContractorListSearch = ({
  getZipMatch,
  getZipMatchAsync,
  searchTerm,
  setSearchTerm,
  serviceFilter,
  setServiceFilter,
  sortByRating,
  setSortByRating,
  zipCodes,
}: ContractorListSearchProps) => {
  const { isMobile, isTablet } = useDevice();
  const router = useRouter();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchNavigate = async (term: string) => {
    if (!term.trim()) return;

    const trimmedTerm = term.trim();

    // Check if it's a ZIP code (5 digits)
    if (/^\d{5}$/.test(trimmedTerm)) {
      // Look for ZIP code in zipCodes array
      const zipCodeData = zipCodes.find(
        (zipData) => zipData.zip === trimmedTerm,
      );

      if (zipCodeData) {
        // Convert city and state to URL-friendly format
        const citySlug = zipCodeData.city.toLowerCase().replace(/\s+/g, "-");
        const stateSlug = zipCodeData.state.toLowerCase();

        // Navigate to the city/state page
        const directUrl = `/${stateSlug}/${citySlug}/painting-contractors`;

        setShowSuggestions(false);
        router.push(directUrl);
        return;
      } else {
        alert(
          `Sorry, we don't have landscapers available in ZIP code ${trimmedTerm} yet.`,
        );
      }
    }

    // First try synchronous ZIP match (legacy support)
    const syncZipResult = getZipMatch?.(trimmedTerm);
    if (syncZipResult) {
      setShowSuggestions(false);
      router.push(syncZipResult.url);
      return;
    }

    // If no sync result and we have async ZIP matching, try that
    if (getZipMatchAsync) {
      try {
        const asyncZipResult = await getZipMatchAsync(trimmedTerm);
        if (asyncZipResult) {
          setShowSuggestions(false);
          router.push(asyncZipResult.url);
          return;
        }
      } catch (error) {
        console.error("Error with async ZIP match:", error);
      }
    }
  };

  const handleZipCodeClick = async (zipCode: string) => {
    // Find the selected zip code data to get city and state
    const selectedZipData = zipCodes.find((zipData) => zipData.zip === zipCode);

    if (selectedZipData) {
      // Convert city and state to URL-friendly format
      const citySlug = selectedZipData.city.toLowerCase().replace(/\s+/g, "-");
      const stateSlug = selectedZipData.state.toLowerCase();

      // Navigate directly to the city/state page
      const directUrl = `/${stateSlug}/${citySlug}/painting-contractors`;
      router.push(directUrl);
    } else {
      await handleSearchNavigate(zipCode);
    }
  };

  const getSortDisplayValue = () => {
    switch (sortByRating) {
      case "chooz-score":
        return "Chooz Score";
      case "google-reviews":
        return "Google Reviews";
      default:
        return "Sort by Rating";
    }
  };

  return (
    <div className="bg-(--clr-tertiary)">
      <div className="container xl:max-w-[1340px] mx-auto px-5 py-5">
        <div className="flex flex-col lg:flex-row gap-5 items-center">
          {/* Search Bar */}
          <div className="flex items-end gap-2 w-full lg:w-[650px]">
            <div className="relative w-full lg:max-w-[350px] text-base">
              <label htmlFor="location" className="text-white block mb-1">
                Location (city/state or ZIP code)
              </label>
              <SearchList
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
                handleSearchNavigate={handleSearchNavigate}
                inputClass="flex items-center bg-white h-[36px] w-full px-3 py-2 rounded-md outline-none"
              />
            </div>
            <button
              type="submit"
              onClick={() => {
                if (/^\d{5}$/.test(searchTerm.trim())) {
                  handleSearchNavigate(searchTerm.trim());
                }
              }}
              disabled={!/^\d{5}$/.test(searchTerm.trim())}
              className={`cursor-pointer bg-(--clr-secondary) p-2 h-[36px] w-[36px] rounded-md flex items-center justify-center text-xl ${
                !searchTerm.trim() ? "cursor-not-allowed" : ""
              }`}
              aria-label="Search">
              <IoSearch />
            </button>
            {(isMobile || isTablet) && (
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="cursor-pointer bg-(--clr-secondary) p-2 h-[36px] w-[36px] rounded-md flex items-center justify-center text-xl ml-auto lg:ml-0"
                aria-label="Filter">
                {isFilterOpen ? <FiX /> : <FiFilter />}
              </button>
            )}{" "}
          </div>

          {/* Filters Section */}
          {(isMobile || isTablet ? isFilterOpen : true) && (
            <div className="flex lg:flex-row flex-col items-end gap-2 w-full">
              {/* Sort Filter */}
              <div className="w-full lg:max-w-[160px] text-base">
                <label htmlFor="sortByRating" className="text-white block mb-1">
                  Sort by Rating
                </label>
                <Select value={sortByRating} onValueChange={setSortByRating}>
                  <SelectTrigger className="cursor-pointer bg-white border-gray-300 w-full">
                    <SelectValue>{getSortDisplayValue()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300 w-full">
                    <SelectItem
                      value="chooz-score"
                      className="cursor-pointer hover:bg-black/10">
                      Chooz Score
                    </SelectItem>
                    <SelectItem
                      value="google-reviews"
                      className="cursor-pointer hover:bg-black/10">
                      Google Reviews
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Zip Code Filter */}
              {/* 
              <div className="w-full lg:max-w-[160px] text-base">
                <label
                  htmlFor="zipCodeFilter"
                  className="text-white block mb-1">
                  Zip code filter
                </label>
                <Select onValueChange={handleZipCodeClick}>
                  <SelectTrigger className="cursor-pointer bg-white border-gray-300 w-full">
                    <SelectValue placeholder="Select a Zip Code"></SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300 w-full">
                    {zipCodesLoading && (
                      <SelectItem
                        value="loading"
                        disabled
                        className="text-gray-500 cursor-not-allowed">
                        Loading zip codes...
                      </SelectItem>
                    )}

                    {!zipCodesLoading &&
                      zipCodes.length > 0 &&
                      zipCodes.map((zipData: any) => (
                        <SelectItem
                          key={zipData.zip}
                          value={zipData.zip}
                          className="cursor-pointer hover:bg-black/10">
                          {zipData.zip}
                        </SelectItem>
                      ))}

                    {!zipCodesLoading && zipCodes.length === 0 && (
                      <SelectItem
                        value="empty"
                        disabled
                        className="text-gray-500 cursor-not-allowed">
                        No zip codes available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              */}

              {/* Service Filter */}
              <ServicesFilter
                serviceFilter={serviceFilter}
                setServiceFilter={setServiceFilter}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractorListSearch;
