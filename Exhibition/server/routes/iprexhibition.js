import { Router } from "express";
import {createExhibitiondata} from "../controller/exhibitionController.js";

const router = Router();

router.post("/", createExhibitiondata);

export default router;