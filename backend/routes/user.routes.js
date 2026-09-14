import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { searchUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/search", requireAuth, searchUsers);

export default router;
