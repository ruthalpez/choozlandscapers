"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  getByCategoryStateCitySlug,
  getByStateCity,
  getZipCodesByStateCity,
  preloadData,
} from "@/lib/getAPI";
import { getAllZipCodes } from "@/lib/getFilterAPI";
import { Contractor } from "@/type/contractor";

type PaginationMeta = {
  total: number;
  page: number;
  totalPages: number;
};

type SortByRating = "chooz-score" | "google-reviews";

type ZipCodeData = {
  zip: string;
  city: string;
  state: string;
  contractor_id?: string;
};

type FAQItem = {
  id: number;
  city: string;
  state: string;
  faq_question_1: string;
  faq_answer_1: string;
  faq_question_2: string;
  faq_answer_2: string;
  faq_question_3: string;
  faq_answer_3: string;
  faq_question_4: string;
  faq_answer_4: string;
  faq_question_5: string;
  faq_answer_5: string;
  faq_locations: any[];
};

type LoadingStates = {
  landscapers: boolean;
  painter: boolean;
  zipCodes: boolean;
  allZipCodes: boolean;
};

type LandscapersContextType = {
  painter: Contractor | null;
  landscapers: Contractor[];
  loading: LoadingStates;
  pagination: PaginationMeta | null;
  sortByRating: SortByRating;
  setSortByRating: (val: SortByRating) => void;
  serviceFilter: string;
  setServiceFilter: (val: string) => void;
  zipCodes: string[];
  allZipCodesData: ZipCodeData[];
  faqs: FAQItem[];
  currentState: string;
  currentCity: string;
  currentPage: number;
  fetchByCategoryStateCitySlug: (
    category: string,
    state: string,
    city: string,
    slug: string,
  ) => Promise<void>;
  fetchByStateCity: (
    state: string,
    city: string,
    page?: number,
    sortByRating?: SortByRating,
    serviceFilter?: string,
  ) => Promise<void>;
  fetchZipCodes: (state: string, city: string) => Promise<void>;
  fetchAllZipCodes: () => Promise<void>;
  preloadPageData: (state: string, city: string) => Promise<void>;
  resetFilters: () => void;
  getFilteredLandscapers: () => Contractor[];
};

const LandscapersContext = createContext<LandscapersContextType | undefined>(
  undefined,
);

// Default loading states
const DEFAULT_LOADING_STATES: LoadingStates = {
  landscapers: false,
  painter: false,
  zipCodes: false,
  allZipCodes: false,
};

export const LandscapersProvider = ({ children }: { children: ReactNode }) => {
  // Core data states
  const [painter, setPainter] = useState<Contractor | null>(null);
  const [landscapers, setLandscapers] = useState<Contractor[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  // Filter states
  const [sortByRating, setSortByRating] = useState<SortByRating>("chooz-score");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  // Location states
  const [currentState, setCurrentState] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Zip code states
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [allZipCodesData, setAllZipCodesData] = useState<ZipCodeData[]>([]);

  // Loading states - more granular control
  const [loading, setLoading] = useState<LoadingStates>(DEFAULT_LOADING_STATES);

  // Refs for request cancellation and debouncing
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Utility function to update specific loading states
  const setSpecificLoading = useCallback(
    (key: keyof LoadingStates, value: boolean) => {
      setLoading((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  // Debounced filter changes
  const debouncedFetch = useCallback(
    (
      state: string,
      city: string,
      page: number,
      sort: SortByRating,
      filter: string,
    ) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        fetchByStateCity(state, city, page, sort, filter);
      }, 300); // 300ms debounce
    },
    [],
  );

  const fetchByCategoryStateCitySlug = useCallback(
    async (category: string, state: string, city: string, slug: string) => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setSpecificLoading("painter", true);

      try {
        const res = await getByCategoryStateCitySlug(
          category,
          state,
          city,
          slug,
          abortControllerRef.current?.signal,
        );

        // Check if request was aborted
        if (abortControllerRef.current?.signal.aborted) return;

        setPainter(res?.data || null);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching painter data:", error);
          setPainter(null);
        }
      } finally {
        setSpecificLoading("painter", false);
      }
    },
    [setSpecificLoading],
  );

  const fetchByStateCity = useCallback(
    async (
      state: string,
      city: string,
      page: number = 1,
      sortByRatingParam?: SortByRating,
      serviceFilterParam?: string,
    ) => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setSpecificLoading("landscapers", true);

      const finalSortByRating = sortByRatingParam || sortByRating;
      const finalServiceFilter =
        serviceFilterParam !== undefined ? serviceFilterParam : serviceFilter;

      try {
        const res = await getByStateCity(
          state,
          city,
          page,
          finalSortByRating,
          finalServiceFilter,
          abortControllerRef.current?.signal,
        );

        // Check if request was aborted
        if (abortControllerRef.current?.signal.aborted) return;

        if (res) {
          setLandscapers(res.data || []);
          setPagination({
            total: res.total || 0,
            page: res.page || 1,
            totalPages: res.totalPages || 1,
          });

          // Only update current location if it's different
          if (currentState !== state) setCurrentState(state);
          if (currentCity !== city) setCurrentCity(city);
          if (currentPage !== page) setCurrentPage(page);

          setFaqs(res.faqs || []);
        } else {
          setLandscapers([]);
          setPagination(null);
          setFaqs([]);
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching landscapers data:", error);
          setLandscapers([]);
          setPagination(null);
          setFaqs([]);
        }
      } finally {
        setSpecificLoading("landscapers", false);
      }
    },
    [
      sortByRating,
      serviceFilter,
      currentState,
      currentCity,
      currentPage,
      setSpecificLoading,
    ],
  );

  const fetchZipCodes = useCallback(
    async (state: string, city: string) => {
      setSpecificLoading("zipCodes", true);

      try {
        const res = await getZipCodesByStateCity(state, city);
        setZipCodes(res?.zipCodes || []);
      } catch (error) {
        console.error("Error fetching zip codes:", error);
        setZipCodes([]);
      } finally {
        setSpecificLoading("zipCodes", false);
      }
    },
    [setSpecificLoading],
  );

  const fetchAllZipCodes = useCallback(async () => {
    setSpecificLoading("allZipCodes", true);

    try {
      const res = await getAllZipCodes();
      setAllZipCodesData(res?.zipCodes || []);
    } catch (error) {
      console.error("Error fetching all ZIP codes:", error);
      setAllZipCodesData([]);
    } finally {
      setSpecificLoading("allZipCodes", false);
    }
  }, [setSpecificLoading]);

  // Preload function for performance optimization
  const preloadPageData = useCallback(
    async (state: string, city: string) => {
      try {
        await preloadData(state, city, {
          sortByRating,
          serviceFilter: serviceFilter !== "all" ? serviceFilter : undefined,
        });
      } catch (error) {
        console.error("Error preloading data:", error);
      }
    },
    [sortByRating, serviceFilter],
  );

  // Reset filters utility
  const resetFilters = useCallback(() => {
    setSortByRating("chooz-score");
    setServiceFilter("all");
    setCurrentPage(1);
  }, []);

  // Memoized filtered landscapers (client-side filtering for performance)
  const getFilteredLandscapers = useCallback(() => {
    let filtered = [...landscapers];

    // Add any client-side filtering logic here if needed
    // For example, additional filters that don't require server calls

    return filtered;
  }, [landscapers]);

  // Optimized filter change handlers
  const handleSortByRatingChange = useCallback(
    (val: SortByRating) => {
      setSortByRating(val);
      if (currentState && currentCity) {
        debouncedFetch(currentState, currentCity, 1, val, serviceFilter);
      }
    },
    [currentState, currentCity, serviceFilter, debouncedFetch],
  );

  const handleServiceFilterChange = useCallback(
    (val: string) => {
      setServiceFilter(val);
      if (currentState && currentCity) {
        debouncedFetch(currentState, currentCity, 1, sortByRating, val);
      }
    },
    [currentState, currentCity, sortByRating, debouncedFetch],
  );

  // Effects with dependency optimization
  useEffect(() => {
    if (currentState && currentCity) {
      fetchZipCodes(currentState, currentCity);
    }
  }, [currentState, currentCity, fetchZipCodes]);

  // Load all zip codes only once
  useEffect(() => {
    fetchAllZipCodes();
  }, [fetchAllZipCodes]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      painter,
      landscapers,
      loading,
      pagination,
      sortByRating,
      setSortByRating: handleSortByRatingChange,
      serviceFilter,
      setServiceFilter: handleServiceFilterChange,
      zipCodes,
      allZipCodesData,
      faqs,
      currentState,
      currentCity,
      currentPage,
      fetchByCategoryStateCitySlug,
      fetchByStateCity,
      fetchZipCodes,
      fetchAllZipCodes,
      preloadPageData,
      resetFilters,
      getFilteredLandscapers,
    }),
    [
      painter,
      landscapers,
      loading,
      pagination,
      sortByRating,
      handleSortByRatingChange,
      serviceFilter,
      handleServiceFilterChange,
      zipCodes,
      allZipCodesData,
      faqs,
      currentState,
      currentCity,
      currentPage,
      fetchByCategoryStateCitySlug,
      fetchByStateCity,
      fetchZipCodes,
      fetchAllZipCodes,
      preloadPageData,
      resetFilters,
      getFilteredLandscapers,
    ],
  );

  return (
    <LandscapersContext.Provider value={contextValue}>
      {children}
    </LandscapersContext.Provider>
  );
};

export const useLandscapers = () => {
  const context = useContext(LandscapersContext);
  if (!context) {
    throw new Error("useLandscapers must be used within a LandscapersProvider");
  }
  return context;
};
