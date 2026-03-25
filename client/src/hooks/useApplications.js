import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const res = await api.getApplications();
      setApplications(res?.applications || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { applications, setApplications, loading, refresh };
}
