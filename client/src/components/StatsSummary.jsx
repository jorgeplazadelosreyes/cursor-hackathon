import React from "react";

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/60 p-4 shadow-calm">
      <div className="text-xs font-medium text-muted">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-ink">{value}</div>
    </div>
  );
}

export default function StatsSummary({ stats }) {
  const {
    appliedThisWeek = 0,
    streak = 0,
    awaitingResponse = 0,
  } = stats || {};

  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-3">
      <Stat label="Jobs applied this week" value={appliedThisWeek} />
      <Stat label="Active day streak" value={`${streak} day${streak === 1 ? "" : "s"}`} />
      <Stat label="Awaiting response" value={awaitingResponse} />
    </section>
  );
}
