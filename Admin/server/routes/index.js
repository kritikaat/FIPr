import { Router } from "express";
import ratingsRoutes from "./ratingRoutes.js";
import feedbackRoutes from "./feedbackroute.js";
import visitorRoutes from "./visitorroute.js";
import exhibitionRoutes from "./exhibitionroute.js";
<<<<<<< HEAD
import adminRoutes from "./admin.js";
=======
>>>>>>> c4a42063d25703a82027a0e39ade332904b2f526

const router = Router();

router.use("/feedback", feedbackRoutes);
router.use("/ratings", ratingsRoutes);
router.use("/visitor", visitorRoutes);
router.use("/exhibition", exhibitionRoutes);
<<<<<<< HEAD
router.use("/admin", adminRoutes);
=======
>>>>>>> c4a42063d25703a82027a0e39ade332904b2f526

 export default router;