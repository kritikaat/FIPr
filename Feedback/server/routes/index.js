import { Router } from "express";

import feedbackRoutes from "./feedbackRoutes.js";
import ratingsRoutes from "./ratingRoutes.js";

const router = Router();

router.use("/feedback", feedbackRoutes);
router.use("/ratings", ratingsRoutes);

 export default router;