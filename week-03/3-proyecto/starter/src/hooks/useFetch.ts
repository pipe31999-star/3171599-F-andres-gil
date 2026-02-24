// Custom hook para fetch genérico
import { useState, useEffect } from 'react';

export const useFetch = <T>(fetchFn: (signal?: AbortSignal) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetchFn(controller.signal)
      .then((res) => setData(res))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [fetchFn]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchFn()
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return { data, loading, error, refetch };
};
