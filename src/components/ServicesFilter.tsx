"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getServices } from "@/lib/services";
import { ContractorServiceGroup } from "@/type/contractor";

interface ServicesFilterProps {
  serviceFilter: string;
  setServiceFilter: (serviceFilter: string) => void;
}

const ServicesFilter = ({
  serviceFilter,
  setServiceFilter,
}: ServicesFilterProps) => {
  const [servicesCatalog, setServicesCatalog] = useState<
    ContractorServiceGroup[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchServicesCatalog = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const data = await getServices(); // ✅ use API helper
        if (!data) throw new Error("No services found");
        setServicesCatalog(data);
      } catch (err) {
        console.error("Error fetching services catalog:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServicesCatalog();
  }, []);

  return (
    <div className="w-full lg:max-w-[200px] text-base">
      <label htmlFor="servicesFilter" className="text-white block mb-1">
        Services filter
      </label>
      <Select value={serviceFilter} onValueChange={setServiceFilter}>
        <SelectTrigger className="cursor-pointer bg-white border-gray-300 w-full">
          <SelectValue>
            {serviceFilter === "all" ? "All" : serviceFilter}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-300 w-full">
          {/* Default option */}
          <SelectItem value="all" className="cursor-pointer hover:bg-black/10">
            All
          </SelectItem>

          {/* Loading / Error states */}
          {isLoading && (
            <SelectItem
              value="loading"
              disabled
              className="text-gray-500 cursor-not-allowed">
              Loading...
            </SelectItem>
          )}
          {error && (
            <SelectItem
              value="error"
              disabled
              className="text-red-500 cursor-not-allowed">
              Failed to load
            </SelectItem>
          )}

          {/* Render services */}
          {!isLoading &&
            !error &&
            servicesCatalog.flatMap((category) => [
              <SelectItem
                key={`header-${category.ServiceHeading}`}
                value={category.ServiceHeading}
                className="cursor-pointer hover:bg-black/10">
                {category.ServiceHeading}
              </SelectItem>,

              ...category.ServiceList.flatMap((service) => {
                if (typeof service === "string") {
                  return (
                    <SelectItem
                      key={`${category.ServiceHeading}-${service}`}
                      value={service}
                      className="cursor-pointer hover:bg-black/10 pl-6">
                      {service}
                    </SelectItem>
                  );
                }

                if (!service.ServiceListHeader) return []; // defensive

                return [
                  <SelectItem
                    key={`${category.ServiceHeading}-${service.ServiceListHeader}`}
                    value={service.ServiceListHeader}
                    className="cursor-pointer hover:bg-black/10 pl-6">
                    {service.ServiceListHeader}
                  </SelectItem>,

                  ...service.ServiceListItems.filter(Boolean).map((item) => (
                    <SelectItem
                      key={`${category.ServiceHeading}-${service.ServiceListHeader}-${item}`}
                      value={item}
                      className="cursor-pointer hover:bg-black/10 pl-12">
                      {item}
                    </SelectItem>
                  )),
                ];
              }),
            ])}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ServicesFilter;
