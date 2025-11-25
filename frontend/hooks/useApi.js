import { useState } from "react";
import axios from "axios";

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

      const url = `http://localhost:8000/api/${route}`;

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
      setLoading(false);

      return { data: response.data, error: null };
    } catch (err) {
      setError(true);
      console.log("Error:", err.response?.data || err.message);
      return { data: null, error: err };
    }
  };

  return { data, error, loading, request };
};
