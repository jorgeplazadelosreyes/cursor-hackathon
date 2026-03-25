import { Router } from "express";
import {
  listApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";

const router = Router();

router.get("/", listApplications);
router.post("/", createApplication);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
