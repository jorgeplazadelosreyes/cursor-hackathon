export async function searchJobs(req, res) {
  // Scaffolding stub: return no jobs for now.
  // Later we will proxy Arbeitnow results through this endpoint and normalize the response shape.
  const q = req.query.q || "";
  const location = req.query.location || "";

  res.json({
    q,
    location,
    jobs: [],
    total: 0,
  });
}
