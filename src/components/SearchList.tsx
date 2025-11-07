"use client";

import type React from "react";
import { useRef, useState, useMemo, useEffect } from "react";
import { normalizeState } from "@/data/normalizeState";
import Link from "next/link";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { getAllCityStateCombos } from "@/lib/getFilterAPI"; // ✅ import API function

interface SearchListProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setSelectedCity?: (value: string) => void;
  setSelectedState?: (value: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
  handleSearchNavigate: (term: string) => void;
  inputClass?: string;
}

interface LocationData {
  city: string;
  state: string;
}

const SearchList = ({
  searchTerm,
  setSearchTerm,
  setSelectedCity,
  setSelectedState,
  showSuggestions,
  setShowSuggestions,
  handleSearchNavigate,
  inputClass,
}: SearchListProps) => {
  const router = useRouter();
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // ✅ State for API data
  const [cityStates, setCityStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const combos = await getAllCityStateCombos();
        setCityStates(combos || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch city/state combos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = debounce((value: string) => {
    setSearchTerm(value);
    setShowSuggestions(true);
    setHighlightedIndex(0);
  }, 50);

  const parsedLocations = useMemo((): LocationData[] => {
    if (!cityStates || cityStates.length === 0) return [];

    return cityStates
      .map((cityStateStr) => {
        const [city, state] = cityStateStr.split(", ");
        return {
          city: city || "",
          state: state || "",
        };
      })
      .filter((location) => location.city && location.state);
  }, [cityStates]);

  const filteredSuggestions = useMemo(() => {
    if (!searchTerm.trim() || parsedLocations.length === 0) return [];

    const searchLower = searchTerm.toLowerCase().trim();

    return parsedLocations
      .filter((location) => {
        const cityMatch = location.city.toLowerCase().includes(searchLower);
        const stateMatch = location.state.toLowerCase().includes(searchLower);
        const fullStateMatch = normalizeState(location.state)
          .toLowerCase()
          .includes(searchLower);
        const combinedMatch =
          `${location.city.toLowerCase()}, ${location.state.toLowerCase()}`.includes(
            searchLower,
          );
        const combinedFullMatch =
          `${location.city.toLowerCase()}, ${normalizeState(
            location.state,
          ).toLowerCase()}`.includes(searchLower);

        return (
          cityMatch ||
          stateMatch ||
          fullStateMatch ||
          combinedMatch ||
          combinedFullMatch
        );
      })
      .sort((a, b) => {
        // Sort alphabetically by city name
        return a.city.localeCompare(b.city);
      })
      .slice(0, 8) // Limit to 8 suggestions
      .map((location) => {
        const citySlug = location.city.toLowerCase().replace(/\s+/g, "-");
        const stateSlug = normalizeState(location.state).toLowerCase();
        const category = "painting-contractors";
        const url = `/${stateSlug}/${citySlug}/${category}`;

        return {
          key: `${location.city.toLowerCase()},${location.state.toLowerCase()}`,
          display: `${location.city}, ${normalizeState(
            location.state,
          ).toUpperCase()}`,
          city: location.city,
          state: normalizeState(location.state),
          url,
        };
      });
  }, [searchTerm, parsedLocations]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (
        highlightedIndex >= 0 &&
        highlightedIndex < filteredSuggestions.length
      ) {
        const selected = filteredSuggestions[highlightedIndex];
        setSearchTerm(selected.display);
        setSelectedCity?.(selected.city.toLowerCase());
        setSelectedState?.(selected.state.toLowerCase());
        setShowSuggestions(false);
        router.push(selected.url);
        return;
      }
      handleSearchNavigate(searchTerm);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <>
      <div className="flex text-base">
        <input
          type="text"
          id="location"
          value={searchTerm}
          autoComplete="off"
          placeholder="Saint Louis, MO"
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 150);
          }}
          className={inputClass}
        />
      </div>

      {showSuggestions && searchTerm && (
        <div
          ref={suggestionsRef}
          className="suggestions-list text-base absolute z-20 w-full bg-white rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
          {loading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="px-4 py-2 text-red-500">{error}</div>
          ) : (
            filteredSuggestions.length > 0 &&
            filteredSuggestions.map((suggestion, index) => (
              <Link
                key={suggestion.key}
                href={suggestion.url}
                className={`block px-4 py-2 cursor-pointer text-black ${
                  highlightedIndex === index
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSearchTerm("");
                  setShowSuggestions(false);
                  setSelectedCity?.(suggestion.city.toLowerCase());
                  setSelectedState?.(suggestion.state.toLowerCase());
                }}>
                <span>{suggestion.display}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default SearchList;
