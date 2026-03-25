import React from "react";

export default function JobCard({ job, onSave }) {
  const title = job.title || job.jobTitle || "Untitled role";
  const company = job.company || "Unknown company";
  const location = job.location || "";
  const description = job.description || "";
  const remote = !!job.remote;

  return (
    <article className="rounded-3xl bg-white/60 p-4 shadow-calm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-ink">{title}</h2>
          <div className="mt-1 text-sm text-muted">{company}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
            {location ? <span>{location}</span> : <span>&nbsp;</span>}
            {remote ? (
              <span className="rounded-full bg-sage/20 px-2 py-1 text-sage-dark">
                Remote
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {description ? (
        <p className="mt-3 text-sm text-slate-700 line-clamp-3">
          {description}
        </p>
      ) : null}

      <div className="mt-4 flex items-center justify-end">
        <button
          type="button"
          onClick={onSave}
          className="rounded-xl bg-sage px-4 py-2 text-sm font-semibold text-ink transition-[transform,background-color] hover:bg-sage-dark active:scale-[0.99]"
        >
          Save
        </button>
      </div>
    </article>
  );
}
