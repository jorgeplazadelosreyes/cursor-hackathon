import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function useStats() {
  const [stats, setStats] = useState({
    appliedThisWeek: 0,
    streak: 0,
    awaitingResponse: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const s = await api.getStats();
        if (!cancelled) setStats(s || {});
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading };
}
