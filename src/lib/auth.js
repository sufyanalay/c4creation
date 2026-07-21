import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function createToken() {
  return jwt.sign({ role: "admin" }, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}