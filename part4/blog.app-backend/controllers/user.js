import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

const userRoutes = express.Router();

const getToken = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startswith("Bearer")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

userRoutes.post("/user", async (req, res) => {
  const { name, username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  if (password.length < 3) {
    return res.status(400).json({ message: "Password must at least 3" });
  }
  const newUser = new User({
    name,
    username,
    password: hashPassword,
  });
  await newUser.save();
  return res
    .status(201)
    .json({ message: "new user created successfully", data: newUser });
});

userRoutes.get("/users", async (req, res) => {
  const users = await User.find({}).populate("blogs");
  return res.status(200).json({ message: "All users fetched", data: users });
});

export { userRoutes };
