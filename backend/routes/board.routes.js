import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireBoardAccess } from "../middleware/boardAccess.middleware.js";
import * as board from "../controllers/board.controller.js";

import columnRoutes from "./column.routes.js";
import taskRoutes from "./task.routes.js";
import aiRoutes from "./ai.routes.js";

const router = Router();

router.use(requireAuth);

router.get("/", board.listBoards);
router.post("/", board.createBoard);

router.get("/:boardId", requireBoardAccess, board.getBoard);
router.patch("/:boardId", requireBoardAccess, board.updateBoard);
router.delete("/:boardId", requireBoardAccess, board.deleteBoard);
router.get("/:boardId/activity", requireBoardAccess, board.getActivity);
router.post("/:boardId/members", requireBoardAccess, board.addMember);
router.delete(
  "/:boardId/members/:userId",
  requireBoardAccess,
  board.removeMember,
);

// Mount nested sub-routers with scoped access control
router.use("/:boardId/columns", requireBoardAccess, columnRoutes);
router.use("/:boardId/tasks", requireBoardAccess, taskRoutes);
router.use("/:boardId/ai", requireBoardAccess, aiRoutes);

export default router;
