import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function useQuote() {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [loading, setLoading] = useState(true);

  const backupQuotes = [
    { q: "One small step today is still a step forward.", a: "" },
    { q: "You don’t have to feel ready to begin. Start anyway.", a: "" },
    { q: "Progress counts, even when it’s quiet.", a: "" },
    { q: "Your effort is not wasted. Keep going gently.", a: "" },
  ];

  function pickBackup() {
    return backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const q = await api.getQuote();
        const quoteText = String(q?.quote ?? "").trim();
        const author = String(q?.author ?? "").trim();
        const backup = pickBackup();
        if (!cancelled) {
          setQuote({
            quote: quoteText || backup.q,
            author: author || backup.a,
          });
        }
      } catch {
        const backup = pickBackup();
        if (!cancelled) setQuote({ quote: backup.q, author: backup.a });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { quote, loading };
}
