"use client";

import { useEffect, useState } from "react";
import { ContractorServiceGroup } from "@/type/contractor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import { getServices } from "@/lib/services";

// ✅ Type guards
function isServiceSubGroup(item: any): item is {
  ServiceListHeader: string;
  ServiceListItems: string[];
} {
  return (
    typeof item === "object" &&
    item !== null &&
    "ServiceListHeader" in item &&
    Array.isArray(item.ServiceListItems)
  );
}

function isServiceGroup(item: any): item is ContractorServiceGroup {
  return (
    typeof item === "object" &&
    item !== null &&
    "ServiceHeading" in item &&
    "ServiceList" in item &&
    Array.isArray(item.ServiceList)
  );
}

// ✅ recursive collector for flattening contractor services
function collectServices(item: any, set: Set<string>) {
  if (typeof item === "string") {
    if (item.trim()) set.add(item);
  } else if (isServiceSubGroup(item)) {
    item.ServiceListItems.forEach((sub) => {
      if (sub.trim()) set.add(sub);
    });
  } else if (item && typeof item === "object" && "ServiceList" in item) {
    item.ServiceList.forEach((nested: any) => collectServices(nested, set));
  } else {
    console.warn("⚠️ Unexpected service item format:", item);
  }
}

const ServicesCatalog = ({
  contractorServices,
}: {
  contractorServices: ContractorServiceGroup[];
}) => {
  const [servicesCatalog, setServicesCatalog] = useState<
    ContractorServiceGroup[]
  >([]);
  const [loadingServicesCatalog, setLoadingServicesCatalog] = useState(true);

  // ✅ flatten contractor services
  const contractorServicesSet = new Set<string>();
  contractorServices.forEach((group) => {
    if (isServiceGroup(group)) {
      group.ServiceList.forEach((item) =>
        collectServices(item, contractorServicesSet),
      );
    }
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data: ContractorServiceGroup[] = await getServices();
        setServicesCatalog(data);
      } catch (error) {
        console.error("Error fetching services catalog:", error);
      } finally {
        setLoadingServicesCatalog(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="mb-4">
      <hr className="mb-8 border-[#bdbdbd]" />
      <div className="mb-4">
        <h2 className="heading-contractor mb-1!">Services</h2>
        <p className="text-[11px] text-gray-400">
          (Services not offered are in gray)
        </p>
      </div>

      {loadingServicesCatalog ? (
        <div className="flex items-center gap-2 mb-4">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-[15px] text-gray-500">Loading services...</span>
        </div>
      ) : (
        <Accordion type="multiple" className="w-full">
          {servicesCatalog.map(({ ServiceHeading, ServiceList }, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-bold">
                <span
                  className={
                    contractorServices.some(
                      (s) => s.ServiceHeading === ServiceHeading,
                    )
                      ? "text-black"
                      : "text-gray-400"
                  }>
                  {ServiceHeading}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-4.5">
                <ul className="list-disc space-y-4">
                  {ServiceList.map((item: any, idx) => {
                    // ✅ Case 1: plain string
                    if (typeof item === "string") {
                      return (
                        <li
                          key={idx}
                          className={
                            contractorServicesSet.has(item)
                              ? "text-black"
                              : "text-gray-400"
                          }>
                          {item}
                        </li>
                      );
                    }

                    // ✅ Case 2: subgroup with ServiceListHeader + ServiceListItems
                    if (isServiceSubGroup(item)) {
                      return (
                        <li key={idx}>
                          <span
                            className={
                              item.ServiceListItems.some((sub) =>
                                contractorServicesSet.has(sub),
                              )
                                ? "font-bold text-black"
                                : "font-bold text-gray-400"
                            }>
                            {item.ServiceListHeader}
                          </span>
                          <ul className="ml-4 list-disc text-sm space-y-2">
                            {item.ServiceListItems.map((sub, subIdx) => (
                              <li
                                key={subIdx}
                                className={
                                  contractorServicesSet.has(sub)
                                    ? "text-black"
                                    : "text-gray-400"
                                }>
                                {sub}
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    }

                    // ✅ Case 3: nested ServiceList (recurse)
                    if (item && "ServiceList" in item) {
                      return (
                        <ul key={idx} className="ml-2 list-disc space-y-2">
                          {item.ServiceList.map((nested: any, nIdx: number) => (
                            <li key={nIdx}>
                              {/* recursive re-use */}
                              {typeof nested === "string" ? (
                                <span
                                  className={
                                    contractorServicesSet.has(nested)
                                      ? "text-black"
                                      : "text-gray-400"
                                  }>
                                  {nested}
                                </span>
                              ) : isServiceSubGroup(nested) ? (
                                <>
                                  <span
                                    className={
                                      nested.ServiceListItems.some((sub) =>
                                        contractorServicesSet.has(sub),
                                      )
                                        ? "font-bold text-black"
                                        : "font-bold text-gray-400"
                                    }>
                                    {nested.ServiceListHeader}
                                  </span>
                                  <ul className="ml-4 list-disc text-sm space-y-2">
                                    {nested.ServiceListItems.map(
                                      (sub, subIdx) => (
                                        <li
                                          key={subIdx}
                                          className={
                                            contractorServicesSet.has(sub)
                                              ? "text-black"
                                              : "text-gray-400"
                                          }>
                                          {sub}
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    console.warn("⚠️ Unexpected service item format:", item);
                    return null;
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default ServicesCatalog;
