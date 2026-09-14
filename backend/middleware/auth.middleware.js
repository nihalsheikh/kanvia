import { verifyToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";

export const requireAuth = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

    if (!token) {
      throw ApiError.unauthorized("Missing authentication token");
    }

    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };

    next();
  } catch (err) {
    if (err.isApiError) {
      return next(err);
    }
    next(ApiError.unauthorized("Invalid or expired token"));
  }
};
