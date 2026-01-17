import axios from "axios";

// export const baseURL = "http://127.0.0.1:8000"; // lokal
export const baseURL = "https://api.bisyaroh.id"; // produksi
const api = axios.create({
  // baseURL: "http://127.0.0.1:8000/api", // lokal
  baseURL: "https://api.bisyaroh.id/api", // produksi
});

export default api;
