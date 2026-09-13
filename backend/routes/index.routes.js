import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) =>
  res.json({
    status: "OK",
    message: "API is healthy",
    uptime: process.uptime(),
  }),
);

export default router;
