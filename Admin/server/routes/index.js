import { Router } from "express";
import ratingsRoutes from "./ratingRoutes.js";
import feedbackRoutes from "./feedbackroute.js";
import visitorRoutes from "./visitorroute.js";
import exhibitionRoutes from "./exhibitionroute.js";
import adminRoutes from "./admin.js";

const router = Router();

router.use("/feedback", feedbackRoutes);
router.use("/ratings", ratingsRoutes);
router.use("/visitor", visitorRoutes);
router.use("/exhibition", exhibitionRoutes);
router.use("/admin", adminRoutes);

 export default router;