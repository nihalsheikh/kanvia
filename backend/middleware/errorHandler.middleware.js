import { isProd } from "../config/envConfig.js";

export const errorHandler = (err, _req, res, _next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = err.errors || [];
  let details = err.details || null;

  // PostgreSQL unique violation (e.g. duplicate email)
  if (err.code === "23505") {
    status = 409;
    message = "Resource already exists";
  }

  // PostgreSQL foreign key violation (e.g. invalid board_id or user_id reference)
  if (err.code === "23503") {
    status = 400;
    message = "Referenced resource does not exist";
  }

  // PostgreSQL invalid UUID syntax
  if (err.code === "22P02") {
    status = 400;
    message = "Invalid ID format";
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    status = 401;
    message = "Token expired";
  }

  // Log critical server errors
  if (status >= 500) {
    console.error("Server error:", err);
    if (isProd) {
      message = "Internal server error";
    }
  }

  res.status(status).json({
    success: false,
    error: message,
    ...(errors.length > 0 && { errors }),
    ...(details && { details }),
    ...(!isProd && status >= 500 && { stack: err.stack }),
  });
};

export const notFoundHandler = (_req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
};
