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
    // Adding token to headers if exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // * Axios will automatically set the Content-Type header for FormData
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response intercepor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);
