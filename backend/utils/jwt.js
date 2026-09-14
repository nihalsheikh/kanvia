import jwt from "jsonwebtoken";
import { env } from "../config/envConfig.js";

const ensureSecret = () => {
  if (!env.jwtSecret)
    throw new Error("CRITICAL: JWT_SECRET is not configured.");
};

export const signToken = (payload, options = {}) => {
  ensureSecret();

  if (!payload || typeof payload !== "object") {
    throw new Error("JWT payload must be an object.");
  }

  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn || "7d",
  });
};

export const verifyToken = (token) => {
  ensureSecret();

  if (!token || typeof token !== "string") {
    throw new Error("Token string is required for verification.");
  }

  return jwt.verify(token, env.jwtSecret);
};
