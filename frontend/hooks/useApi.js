import { useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import { useProgress } from "../context/ProgressContext";
import AsyncCache from "../components/AsyncCache";

export const useApi = (
  method,
  route,
  headers = { "Content-Type": "application/json" }
) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const { startUpload, finishUpload, startLoading, endLoading } = useProgress();

  const request = async (payload = null) => {
    const url = `${API_URL}/api/${route}`;
    let response;

    // Start loading indicator
    startLoading();

    try {
      if (method.toLowerCase() === "get") {
        //  Cache FIRST
        const cached = await AsyncCache.get(url);

        if (cached) {
          // Serving from cache if exists
          setData(cached);
          setError(false);
          // Return the cached data immediately
          return { data: cached, error: null };
        }

        // Fetching from network
        response = await axios.get(url, { headers });

        // Update cache and state with fresh network data
        await AsyncCache.store(url, response.data);
        setData(response.data);
        setError(false);
        return { data: response.data, error: null };
      } else {
        // Handling POST, PUT, DELETE requests (which shouldn't use cache)
        if (method.toLowerCase().includes("post", "put", "delete")) {
          startUpload();
        }
        response = await axios[method](url, payload, { headers });

        finishUpload();

        setData(response.data);
        setError(false);
        return { data: response.data, error: null };
      }
    } catch (err) {
      //  Runs if the Network call failed.
      console.log("Network or validation error");
      console.log("Status:", err.response?.status);
      console.log("Backend error:", err.response?.data?.errors);

      // If the GET method fails AND the cache was empty
      if (method.toLowerCase() === "get") {
        setError(true);
      } else {
        // For non-GET methods, the failure is a real error.
        setError(true);
      }

      return { data: null, error: err.response?.data?.errors };
    } finally {
      endLoading();
    }
  };
  return { data, error, request };
};
