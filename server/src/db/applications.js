import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Keep the DB next to the server so it works regardless of `process.cwd()`.
const DB_DIR = path.join(__dirname, "../../data");
const DB_PATH = path.join(DB_DIR, "applications.db");

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    remote INTEGER NOT NULL DEFAULT 0,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT '',
    date_added TEXT NOT NULL
  );
`);

function toRow(app) {
  return {
    id: app.id,
    jobTitle: app.job_title,
    company: app.company,
    location: app.location,
    remote: !!app.remote,
    description: app.description,
    status: app.status,
    notes: app.notes,
    dateAdded: app.date_added,
  };
}

export function getAllApplications() {
  const rows = db
    .prepare(
      `SELECT * FROM applications ORDER BY datetime(date_added) DESC`,
    )
    .all();
  return rows.map(toRow);
}

export function insertApplication({
  jobTitle,
  company,
  location,
  remote,
  description,
  status,
  notes,
}) {
  const stmt = db.prepare(`
    INSERT INTO applications (job_title, company, location, remote, description, status, notes, date_added)
    VALUES (@jobTitle, @company, @location, @remote, @description, @status, @notes, @dateAdded)
  `);

  const info = stmt.run({
    jobTitle,
    company,
    location,
    remote,
    description: description || "",
    status,
    notes: notes || "",
    dateAdded: new Date().toISOString(),
  });

  const row = db
    .prepare(`SELECT * FROM applications WHERE id = ?`)
    .get(info.lastInsertRowid);

  return toRow(row);
}

export function updateApplicationById(id, { status, notes }) {
  const existing = db.prepare(`SELECT * FROM applications WHERE id = ?`).get(id);
  if (!existing) return null;

  const nextStatus = status != null ? status : existing.status;
  const nextNotes = notes != null ? notes : existing.notes;

  db.prepare(
    `UPDATE applications SET status = ?, notes = ? WHERE id = ?`,
  ).run(nextStatus, nextNotes, id);

  const row = db
    .prepare(`SELECT * FROM applications WHERE id = ?`)
    .get(id);

  return toRow(row);
}

export function deleteApplicationById(id) {
  const info = db.prepare(`DELETE FROM applications WHERE id = ?`).run(id);
  return info.changes > 0;
}

