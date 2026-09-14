import { Router } from "express";
import * as ai from "../controllers/ai.controller.js";

const router = Router({ mergeParams: true });

router.post("/generate-tasks", ai.generateTasks);
router.post("/breakdown", ai.breakdownTask);
router.post("/summary", ai.summarizeBoard);

export default router;
