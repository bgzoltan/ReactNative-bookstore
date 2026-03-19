import { useState } from "react";
import { API_URL } from "@env";
import { useProgress } from "../context/ProgressContext";
import AsyncCache from "../components/AsyncCache";
import { apiClient } from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

// Calling the specified backend endpoint (route) by a 'method' using this custom hook
export const useApi = (method, route) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // Controlling the loading state
  const { startUpload, finishUpload, startLoading, endLoading } = useProgress();
  const { token } = useAuth();

  // The frontend request
  const request = async (payload = null, params = {}, query = "") => {
    // Creating the whole url
    let url = `${API_URL}/api/${route}`;

    const methodLower = method.toLowerCase();

    try {
      // Do these if the method is 'GET'
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

        // Adding the params value to the url
        if (params)
          Object.keys(params).forEach((key) => {
            url = url.replace(`:${key}`, params[key]);
          });

        // Adding the query keys to the url
        if (query) {
          url += "/?";
          Object.keys(query).forEach((key) => {
            url += `${key}=${query[key]}`;
          });
        }
        // Use the axios apiClient to fetch the data / add the token to authenticate the user -> the backend middleware will check it
        const response = await apiClient.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          params: payload || {},
        });

        // Update cache and state with the data
        await AsyncCache.store(url, response.data);
        setData(response.data);
        setError(null);
        // Return the data to the component
        return { data: response.data, error: null };
      } else {
        //    Do these if the method is 'POST, PUT, DELETE'
        startLoading();

        if (["post", "put", "delete"].includes(methodLower)) {
          // Start progressbar if necessary
          startUpload();
        }

        // Adding the params value to the url
        if (params)
          Object.keys(params).forEach((key) => {
            url = url.replace(`:${key}`, params[key]);
          });

        const response = await apiClient[method](url, payload);
        finishUpload();

        setError(null);
        // Return the data to the component
        return { data: response.data, error: null };
      }
    } catch (err) {
      // err sent by backend errorHandler middleware and  Axios received it in my useApi /apiClient
      /// the error structure is changed by Axios:
      // err.response  - Axios added
      // err.response.data
      // err.response.status
      // err.message - Axios added general message

      let errorToSet;
      const getErrorMessage = (status) => {
        const errorMap = {
          400: "Bad request.",
          401: "Please log in again.",
          403: "You don't have permission to access this resource.",
          404: "Sorry, resource not found.",
          500: "Server error. Please try again later.",
          503: "Service unavailable. Please try again later.",
        };
        return errorMap[status] || "An error occurred.";
      };

      const isEmptyObject = (obj) =>
        obj && obj.constructor === Object && Object.keys(obj).length === 0;

      if (err.response) {
        const errors = err.response.data?.errors || null;
        const status = err.response.status;
        const message =
          getErrorMessage(status) + " " + err.response.data?.message;

        errorToSet = {
          message:
            !isEmptyObject(errors) && errors != null
              ? JSON.stringify(errors)
              : message,
          errors: errors,
          status: status,
        };
        console.log("Server error:", err.response.status, message);
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

      // Return error to the component
      setError(errorToSet);
      return { data: null, error: errorToSet };
    } finally {
      endLoading();
    }
  };

  return { data, error, request };
};
