import jwt from "jsonwebtoken";

export function createToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      nume: user.nume,
      email: user.email,
      rol: user.rol || "user",
    },
    process.env.JWT_SECRET,
    { expiresIn: "30m" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}