import axios from "axios";
import { API_URL } from "@env";
import { getToken } from "../components/SecureStorage";

export const apiClient = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  timeout: 10000, // Request timeout
});

// Request interceptor

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token && token !== "null") {
      // Use spread to ensure the headers object is updated correctly
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response intercepor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("❌ Response interceptor error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);
