import { useState, useEffect } from "react";
import axios from "axios";

export const useApi = (method, route) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (payload) => {
    try {
      setLoading(true);
      const response = await axios[method](
        `http://localhost:8000/api/${route}`,
        payload ? payload : null
      );
      setData(response.data);
      setError(false);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log("Error:", error.response?.data || error.message);
    }
  };

  return { data, error, loading, request };
};
