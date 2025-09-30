import { useState, useEffect } from "react";

export function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(customOptions = {}) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, { ...options, ...customOptions });
      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}
