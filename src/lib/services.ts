import axios from "axios";

const isDev = process.env.NODE_ENV === "development";
const LIVE_API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/services/landscapers";
const DEV_API_URL = "http://localhost:8000/api/services/landscapers";

const API_URL = isDev ? DEV_API_URL : LIVE_API_URL;

// ✅ Get Services
export async function getServices() {
  const res = await axios.get(API_URL);

  if (res.status !== 200) {
    throw new Error("Failed to fetch services");
  }

  return res.data; // returns ContractorServiceGroup[]
}
