import { useState, useEffect, useCallback, useRef } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      if (mountedRef.current) setData(result);
    } catch (fetchError) {
      if (mountedRef.current) setError(fetchError);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    loadData();
    return () => {
      mountedRef.current = false;
    };
  }, [loadData]);

  return {
    data,
    loading,
    error,
    refetch: loadData,
  };
}
