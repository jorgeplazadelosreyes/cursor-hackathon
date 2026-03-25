import { Router } from "express";

import quoteRoutes from "./quoteRoutes.js";
import jobRoutes from "./jobRoutes.js";
import applicationRoutes from "./applicationRoutes.js";
import statsRoutes from "./statsRoutes.js";

const router = Router();

router.use("/quote", quoteRoutes);
router.use("/jobs", jobRoutes);
router.use("/applications", applicationRoutes);
router.use("/stats", statsRoutes);

export default router;
