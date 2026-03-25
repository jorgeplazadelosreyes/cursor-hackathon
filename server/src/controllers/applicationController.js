import {
  getAllApplications,
  insertApplication,
  updateApplicationById,
  deleteApplicationById,
} from "../db/applications.js";

const ALLOWED_STATUSES = new Set([
  "Saved",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
]);

function normalizeBoolToInt(value) {
  return value === true || value === 1 || value === "1" ? 1 : 0;
}

export async function listApplications(req, res) {
  const applications = getAllApplications();
  res.json({ applications });
}

export async function createApplication(req, res) {
  const {
    jobTitle = "",
    company = "",
    location = "",
    remote = 0,
    description = "",
    status = "Saved",
    notes = "",
  } = req.body || {};

  if (!ALLOWED_STATUSES.has(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const created = insertApplication({
    jobTitle,
    company,
    location,
    remote: normalizeBoolToInt(remote),
    description,
    status,
    notes,
  });

  res.status(201).json({ application: created });
}

export async function updateApplication(req, res) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  const { status, notes } = req.body || {};

  if (status != null && !ALLOWED_STATUSES.has(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const updated = updateApplicationById(id, {
    status,
    notes,
  });

  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json({ application: updated });
}

export async function deleteApplication(req, res) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  const ok = deleteApplicationById(id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
}
