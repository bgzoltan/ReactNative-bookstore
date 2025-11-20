import { useState, useEffect } from "react";
import axios from "axios";

export const useApi = (method, route, payload = null) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (route, payload) => {
    try {
      setLoading(true);
      const response = await axios[method](route, payload);
      setData(response.data);
      setError(false);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    request(`http://localhost:8000/api/${route}`, payload);
  }, []);

  return { data, error, loading };
};
