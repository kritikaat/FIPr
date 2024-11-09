import { Router } from "express";
import iprexhibitionroute from "./iprexhibition.js";

const router = Router();

router.use("/iprexhibition", iprexhibitionroute);
export default router;