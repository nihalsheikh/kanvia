import { Router } from "express";
import * as task from "../controllers/task.controller.js";

const router = Router({ mergeParams: true });

router.get("/", task.listTasks);
router.post("/", task.createTask);
router.patch("/:taskId", task.updateTask);
router.patch("/:taskId/move", task.moveTask);
router.delete("/:taskId", task.deleteTask);

export default router;
