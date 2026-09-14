import bcrypt from "bcryptjs";
import { query } from "../config/db.js";
import { signToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Email Regex to validate the format
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strips sensitive fields like password_hash before sending back to client
const publicUser = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  avatar_url: u.avatar_url,
  created_at: u.created_at,
});

// User sign up
export const register = asyncHandler(async (req, res) => {
  const name = (req.body.name || "").trim();
  const email = (req.body.email || "").trim().toLowerCase();
  const password = req.body.password;

  if (!name) {
    throw ApiError.badRequest("Name is required");
  }

  if (!EMAIL_RE.test(email)) {
    throw ApiError.badRequest("A valid email is required");
  }

  if (!password || password.length < 6) {
    throw ApiError.badRequest("Password must be at least 6 characters");
  }

  const existing = await query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);
  if (existing.rows.length) {
    throw ApiError.conflict("Email is already registered");
  }

  const password_hash = await bcrypt.hash(password, 10);
  const { rows } = await query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, avatar_url, created_at`,
    [name, email, password_hash],
  );

  const user = rows[0];
  const token = signToken({ id: user.id, email: user.email, name: user.name });

  res.status(201).json({ user: publicUser(user), token });
});

// User sign in
export const login = asyncHandler(async (req, res) => {
  const email = (req.body.email || "").trim().toLowerCase();
  const password = req.body.password;

  if (!email || !password) {
    throw ApiError.badRequest("Email and password are required");
  }

  const { rows } = await query("SELECT * FROM users WHERE email = $1", [email]);
  const user = rows[0];

  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const token = signToken({ id: user.id, email: user.email, name: user.name });

  res.json({ user: publicUser(user), token });
});

// User profile
export const me = asyncHandler(async (req, res) => {
  const { rows } = await query(
    "SELECT id, name, email, avatar_url, created_at FROM users WHERE id = $1",
    [req.user.id],
  );

  if (!rows.length) {
    throw ApiError.notFound("User not found");
  }

  res.json({ user: rows[0] });
});
