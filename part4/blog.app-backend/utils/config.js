import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const PORT = process.env.PORT;

const createJwt = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export { MONGODB_URI, PORT, createJwt };
