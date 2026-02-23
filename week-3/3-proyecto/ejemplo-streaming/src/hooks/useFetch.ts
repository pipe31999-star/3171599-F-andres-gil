// Custom hook mejorado con refetch
import { useState, useEffect, useCallback } from 'react';

export const useFetch = <T,>(fetchFn: (signal?: AbortSignal) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    (signal?: AbortSignal) => {
      setLoading(true);
      setError(null);
      fetchFn(signal)
        .then((res) => setData(res))
        .catch((err) => {
          if (err.name !== 'AbortError') setError(err.message);
        })
        .finally(() => setLoading(false));
    },
    [fetchFn]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchFn, fetchData]);

  const refetch = () => {
    const controller = new AbortController();
    fetchData(controller.signal);
  };

  return { data, loading, error, refetch };
};
