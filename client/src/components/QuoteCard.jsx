import React from "react";

export default function QuoteCard({ quote, author }) {
  return (
    <section className="rounded-2xl bg-white/70 p-6 shadow-calm">
      <div className="text-xs font-medium text-muted">Today’s encouragement</div>
      <blockquote className="mt-3 text-ink text-lg leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {author ? (
        <div className="mt-3 text-sm text-muted">— {author}</div>
      ) : null}
    </section>
  );
}
