import "dotenv/config";
import express from "express";
import cors from "cors";

import apiRoutes from "./routes/api.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`CalmApply API listening on http://localhost:${port}`);
});
