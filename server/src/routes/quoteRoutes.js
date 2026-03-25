import { Router } from "express";
import { getQuote } from "../controllers/quoteController.js";

const router = Router();

router.get("/", getQuote);

export default router;
