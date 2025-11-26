import { useState } from "react";
import axios from "axios";
import { API_URL } from "@env";

export const useApi = (
  method,
  route,
  headers = { "Content-Type": "application/json" }
) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (payload = null) => {
    try {
      setLoading(true);

      const url = `${API_URL}/api/${route}`;
      let response;

      if (method.toLowerCase() === "get") {
        response = await axios.get(url, {
          headers,
        });
      } else {
        response = await axios[method](url, payload, {
          headers,
        });
      }

      setData(response.data);
      setError(false);

      return { data: response.data, error: null };
    } catch (err) {
      setError(true);
      console.log("Error:", err.response?.data || err.message);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, request };
};
