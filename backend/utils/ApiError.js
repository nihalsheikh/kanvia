class ApiError extends Error {
  constructor(statusCode, message, errors = [], details = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.details = details;
    this.isApiError = true;

    Error.captureStackTrace(this, this.constructor);
  }

  // 400 - Malformed payload, invalid query params
  static badRequest(msg = "Bad request", errors = []) {
    return new ApiError(400, msg, errors);
  }

  // 401 - Missing or expired JWT token
  static unauthorized(msg = "Unauthorized") {
    return new ApiError(401, msg);
  }

  // 403 - Authenticated, but lacks board permission (e.g. viewer trying to delete)
  static forbidden(msg = "Forbidden") {
    return new ApiError(403, msg);
  }

  // 404 - Board, column, or task does not exist
  static notFound(msg = "Not found") {
    return new ApiError(404, msg);
  }

  // 409 - Email already registered, card move version conflict
  static conflict(msg = "Conflict") {
    return new ApiError(409, msg);
  }

  // 422 - Validation failed (e.g., empty task title, invalid email format)
  static unprocessableEntity(msg = "Validation failed", errors = []) {
    return new ApiError(422, msg, errors);
  }

  // 429 - Exceeded AI Gemini prompt limits or request rate limits
  static tooManyRequests(msg = "Too many requests, please try again later") {
    return new ApiError(429, msg);
  }

  // 500 - Unexpected database crash, AI API outage
  static internal(msg = "Internal server error") {
    return new ApiError(500, msg);
  }
}

export default ApiError;
