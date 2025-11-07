import { Contractor } from "@/type/contractor";

const getZipCodesFromServiceAreas = (contractors: Contractor[]) => {
  const zipSet = new Set<string>();
  contractors.forEach((contractor) => {
    if (contractor.post_code) {
      zipSet.add(contractor.post_code);
    }
  });
  return Array.from(zipSet).sort();
};

export default getZipCodesFromServiceAreas;
