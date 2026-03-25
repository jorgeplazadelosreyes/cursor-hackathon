import { Router } from "express";
import { searchJobs } from "../controllers/jobController.js";

const router = Router();

router.get("/", searchJobs);

export default router;
