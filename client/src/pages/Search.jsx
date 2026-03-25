import React, { useMemo, useState } from "react";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";
import JobCard from "../components/JobCard.jsx";
import api from "../services/api.js";

export default function Search() {
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSearch = useMemo(() => q.trim().length > 0, [q]);

  async function onSearch(e) {
    e.preventDefault();
    setError("");
    setJobs([]);
    if (!canSearch) return;
    setLoading(true);
    try {
      const res = await api.searchJobs(q, location);
      setJobs(res?.jobs || []);
    } catch (err) {
      setError("Couldn’t fetch jobs. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  async function onSave(job) {
    // Save jobs directly into the tracker under "Saved".
    await api.createApplication({
      jobTitle: job.title || job.jobTitle || "Untitled role",
      company: job.company || "Unknown company",
      location: job.location || "",
      remote: !!job.remote,
      description: job.description || "",
      status: "Saved",
      notes: "",
    });
    // Keep UX calm: no toast/spam; just remove from results for now.
    setJobs((prev) => prev.filter((j) => j.id !== job.id));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white/60 p-6 shadow-calm">
        <h1 className="text-xl font-semibold text-ink">Search Jobs</h1>
        <p className="mt-2 text-muted text-sm">
          Find roles in one clean place. Save what feels right.
        </p>

        <form onSubmit={onSearch} className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="sm:col-span-1">
            <span className="text-xs font-medium text-muted">Keyword</span>
            <input
              className="mt-1 w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 outline-none focus:border-sage"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. Product Manager"
            />
          </label>
          <label className="sm:col-span-1">
            <span className="text-xs font-medium text-muted">Location (optional)</span>
            <input
              className="mt-1 w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 outline-none focus:border-sage"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Remote / Madrid"
            />
          </label>
          <div className="sm:col-span-1 sm:flex sm:items-end">
            <button
              type="submit"
              disabled={!canSearch || loading}
              className="mt-1 w-full rounded-xl bg-sage px-4 py-2 font-semibold text-ink shadow-calm transition-shadow disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {error ? <div className="mt-3 text-sm text-slate-700">{error}</div> : null}
      </section>

      <section className="space-y-3">
        {loading && jobs.length === 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            <LoadingSkeleton className="h-32" />
            <LoadingSkeleton className="h-32" />
          </div>
        ) : null}

        {jobs.length === 0 && !loading ? (
          <div className="rounded-3xl bg-white/40 p-6 text-muted">
            Your results will appear here.
          </div>
        ) : null}

        <div className="grid gap-3 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onSave={() => onSave(job)} />
          ))}
        </div>
      </section>
    </div>
  );
}
