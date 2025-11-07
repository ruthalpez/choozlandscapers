import axios from "axios";

const isDev = process.env.NODE_ENV === "development";
const LIVE_API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/filters/landscapers";
const DEV_API_URL = "http://localhost:8000/api/filters/landscapers";

const API_URL = isDev ? DEV_API_URL : LIVE_API_URL;

export async function getAllCityStateCombos() {
  try {
    const res = await axios.get(`${API_URL}/city-state-combos`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch city/state combos");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching city/state combos:", error);
    return null;
  }
}

// ✅ Get Contractors with Filters
export async function getFilteredContractors(params = {}) {
  // params can include: state, page, limit, search, range, claimed, tags, scores, claimedAndActiveProfile, sortTitle, sortOrder
  try {
    const res = await axios.get(API_URL, { params });
    if (res.status !== 200) {
      throw new Error("Failed to fetch filtered contractors");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching filtered contractors:", error);
    return null;
  }
}

export const getAllZipCodes = async () => {
  try {
    const response = await fetch(`${API_URL}/zip-codes`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all ZIP codes:", error);
    throw error;
  }
};
