import { useState, useEffect } from "react";

// Defina aqui a URL base do seu backend
const API_URL = "https://my-checklist-backend.vercel.app";

export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(customOptions = {}) {
    setLoading(true);
    setError(null);
    try {
      // Adiciona a URL completa do backend
      const response = await fetch(`${API_URL}${endpoint}`, { ...options, ...customOptions });
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
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
}
