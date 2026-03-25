import axios from "axios";

export async function getQuote(req, res) {
  const url =
    process.env.ZEN_QUOTES_URL || "https://zenquotes.io/api/random";

  const backupQuotes = [
    { q: "One small step today is still a step forward.", a: "" },
    { q: "You don’t have to feel ready to begin. Start anyway.", a: "" },
    { q: "Progress counts, even when it’s quiet.", a: "" },
    { q: "Your effort is not wasted. Keep going gently.", a: "" },
  ];

  function pickBackup() {
    return backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
  }

  try {
    const response = await axios.get(url, { timeout: 8000 });
    const first = Array.isArray(response.data) ? response.data[0] : null;

    const backup = pickBackup();
    const quoteText = (first?.q ?? "").trim() || backup.q;
    const author = (first?.a ?? "").trim() || backup.a;

    res.json({ quote: quoteText, author });
  } catch (err) {
    const backup = pickBackup();
    // Always return a non-empty quote so the UI never renders blank.
    res.json({
      quote: backup.q,
      author: backup.a,
    });
  }
}
