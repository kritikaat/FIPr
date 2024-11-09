import { Router } from "express";
import { createRating } from "../controllers/ratingController.js";

const router = Router();

router.post("/", createRating);

export default router;