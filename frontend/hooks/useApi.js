import { useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import { useProgress } from "../context/ProgressContext";

export const useApi = (
  method,
  route,
  headers = { "Content-Type": "application/json" }
) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const { startUpload, finishUpload, startLoading, endLoading } = useProgress();

  const request = async (payload = null) => {
    try {
      const url = `${API_URL}/api/${route}`;
      let response;

      if (method.toLowerCase() === "get") {
        startLoading();
        response = await axios.get(url, {
          headers,
        });
      } else {
        if (method.toLowerCase() === "post") {
          startUpload();
        }
        response = await axios[method](url, payload, {
          headers,
        });
        finishUpload();
      }
      setData(response.data);
      setError(false);
      return { data: response.data, error: null };
    } catch (err) {
      setError(true);
      console.log("Error:", err.response?.data || err.message);
      return { data: null, error: err };
    } finally {
      endLoading();
    }
  };

  return { data, error, request };
};
