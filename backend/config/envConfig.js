import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`CRITICAL: Environment variable ${key} is missing.`);
    } else {
      console.warn(`WARNING: ${key} is not set in environment variables.`);
    }
  }
}

export const env = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrls: process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",")
        .map((url) => url.trim())
        .filter(Boolean)
    : ["http://localhost:5173"],
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || "",
    model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
  },
};

export const isProd = env.nodeEnv === "production";
