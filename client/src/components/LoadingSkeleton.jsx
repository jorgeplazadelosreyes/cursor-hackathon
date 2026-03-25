import React from "react";

export default function LoadingSkeleton({ className = "" }) {
  return (
    <div
      className={[
        "animate-pulse rounded-xl bg-slate-200/80",
        className,
      ].join(" ")}
      aria-hidden="true"
    />
  );
}
