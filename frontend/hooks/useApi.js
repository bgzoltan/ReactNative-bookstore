import { useState } from "react";
import { API_URL } from "@env";
import { useProgress } from "../context/ProgressContext";
import AsyncCache from "../components/AsyncCache";
import { apiClient } from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

export const useApi = (method, route) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { startUpload, finishUpload, startLoading, endLoading } = useProgress();
  const { token } = useAuth();

  const request = async (payload = null) => {
    const url = `${API_URL}/api/${route}`;
    const methodLower = method.toLowerCase();

    try {
      if (methodLower === "get") {
        // Check cache first
        const cached = await AsyncCache.get(url);

        // Skip cache for message routes
        const shouldUseCache =
          !url.includes("received-message") && !url.includes("sent-messages");
        if (shouldUseCache && cached) {
          // Serve from cache without loading indicator
          setData(cached);
          setError(null);
          return { data: cached, error: null };
        }

        // No cache or shouldn't use cache - fetch from network
        startLoading();
        const response = await apiClient.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          params: payload || {},
        });

        // Update cache and state
        await AsyncCache.store(url, response.data);
        setData(response.data);
        setError(null);
        return { data: response.data, error: null };
      } else {
        // POST, PUT, DELETE requests
        startLoading();

        if (["post", "put", "delete"].includes(methodLower)) {
          startUpload();
        }

        const response = await apiClient[method](url, payload);
        finishUpload();

        setError(null);
        return { data: response.data, error: null };
      }
    } catch (err) {
      let errorToSet;
      const isEmptyObject = (obj) =>
        obj && obj.constructor === Object && Object.keys(obj).length === 0;

      if (err.response) {
        const errors = err.response.data?.errors || null;
        const message = err.response.data?.message || err.statusText;

        errorToSet = {
          message: !isEmptyObject(errors) ? JSON.stringify(errors) : message,
          errors: errors,
        };
        console.log("Server error:", err.response.status, errorToSet);
      } else if (err.request) {
        errorToSet = {
          message: "Network error - no response from server",
        };
        console.log("Network error:", err.message);
      } else {
        errorToSet = {
          message: err.message || "Unknown error occurred",
        };
        console.log("Error:", err.message);
      }

      setError(errorToSet);
      return { data: null, error: errorToSet };
    } finally {
      endLoading();
    }
  };

  return { data, error, request };
};
