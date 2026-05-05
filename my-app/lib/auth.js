import jwt from "jsonwebtoken";

export function createToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      nume: user.nume,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}