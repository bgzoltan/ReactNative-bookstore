import { useState } from "react";
import { API_URL } from "@env";
import { useProgress } from "../context/ProgressContext";
import AsyncCache from "../components/AsyncCache";
import { apiClient } from "../api/apiClient";

export const useApi = (method, route) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const { startUpload, finishUpload, startLoading, endLoading } = useProgress();

  const request = async (payload = null) => {
    const url = `${API_URL}/api/${route}`;

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
        const response = await apiClient.get(url, {
          params: payload || {},
        });
        // response = await axios.get(url, { headers, params: payload || {} });

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
        // response = await axios[method](url, payload, { headers });
        const response = await apiClient[method](url, payload);

        finishUpload();

        setData(response.data);
        setError(false);
        return { data: response.data, error: null };
      }
    } catch (err) {
      //  * Axios error structure
      // message: string,
      // name: "AxiosError",
      // stack: string,
      // code: string,          // e.g. "ERR_BAD_REQUEST"
      // config: { ... },       // axios request config
      // request: { ... },      // the raw request object (if sent)
      // response: {            // ONLY exists if server responded
      //   data: any,           // ← your backend errors & body
      //   status: number,      // 400, 401, 500, ...
      //   statusText: string,
      //   headers: object,
      //   config: object,
      //   request: object
      // },
      // cause: Error | undefined
      //  Runs if the Network call failed.
      // const { status = 500 } = err.response;
      const { errors = null, message = "" } = err.response.data;

      // If the GET method fails AND the cache was empty
      if (method.toLowerCase() === "get") {
        setError(true);
      } else {
        // For non-GET methods, the failure is a real error.
        setError(true);
      }

      //  *If the errors o bject is not empty then it is a formi error
      const isEmptyObject = (obj) =>
        obj && obj.constructor === Object && Object.keys(obj).length === 0;

      return {
        data: null,
        error: !isEmptyObject(errors) ? errors : message,
      };
    } finally {
      endLoading();
    }
  };
  return { data, error, request };
};
