import { useState, useEffect } from "react";
import axios from "axios";

export const useApi = (method, ...params) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    try {
      setLoading(true);
      const response = await axios[method](...args);
      setData(response.data);
      setError(false);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    request(...params);
  }, []);

  return { data, error, loading };
};
