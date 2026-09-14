import { Router } from "express";
import * as column from "../controllers/column.controller.js";

const router = Router({ mergeParams: true });

router.post("/", column.createColumn);
router.patch("/:columnId", column.updateColumn);
router.delete("/:columnId", column.deleteColumn);

export default router;
