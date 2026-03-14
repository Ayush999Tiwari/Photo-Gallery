import { useEffect, useState, useCallback } from "react";
export function useFetchPhotos(limit = 30) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://picsum.photos/v2/list?limit=${limit}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      setError(err.message || "Failed to fetch photos.");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos, loading, error };
}
