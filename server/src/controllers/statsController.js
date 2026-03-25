export async function getStats(req, res) {
  // Scaffolding stub: return zeros until we compute real streak/response rate.
  res.json({
    appliedThisWeek: 0,
    streak: 0,
    awaitingResponse: 0,
    responseRate: 0,
  });
}
