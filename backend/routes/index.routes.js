import { Router } from "express";
import authRoutes from "./auth.routes.js";
import boardRoutes from "./board.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

// API Health Check
router.get("/health", (_req, res) =>
  res.json({
    status: "OK",
    message: "API is healthy",
    uptime: process.uptime(),
  }),
);

// Main Routes
router.use("/auth", authRoutes);
router.use("/boards", boardRoutes);
router.use("/users", userRoutes);

export default router;
