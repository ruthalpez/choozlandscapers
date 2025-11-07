const isDev = process.env.NODE_ENV === "development";
const API_BASE = isDev
  ? "http://localhost:8000"
  : "https://chooz.api.choozbetter.com";
export const API_ROOT = `${API_BASE}/api/landscapers`;
