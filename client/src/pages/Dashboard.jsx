import React from "react";
import QuoteCard from "../components/QuoteCard.jsx";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";
import StatsSummary from "../components/StatsSummary.jsx";
import useQuote from "../hooks/useQuote.js";
import useStats from "../hooks/useStats.js";

export default function Dashboard() {
  const { quote, loading: quoteLoading } = useQuote();
  const { stats, loading: statsLoading } = useStats();
  const loading = quoteLoading || statsLoading;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white/60 p-6 shadow-calm">
        <h1 className="text-2xl font-semibold text-ink">
          Good morning, Jordan. Here&apos;s your focus for today.
        </h1>
        <p className="mt-2 text-muted">
          One small action now is progress.
        </p>
      </section>

      {loading ? (
        <LoadingSkeleton className="h-[160px]" />
      ) : (
        <QuoteCard quote={quote.quote} author={quote.author} />
      )}

      {loading ? <LoadingSkeleton className="h-28" /> : <StatsSummary stats={stats} />}
    </div>
  );
}
