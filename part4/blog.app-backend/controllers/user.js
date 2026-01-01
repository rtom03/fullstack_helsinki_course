import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import dotenv from "dotenv";
import { createJwt } from "../utils/config.js";

dotenv.config();
const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    if (password.length < 3) {
      return res.status(400).json({ message: "Password must at least 3" });
    }
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      username,
      password: hashPassword,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "new user created successfully", data: newUser });
  } catch (error) {
    console.log(error);
  }
});

userRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!user) return res.status(400).json({ message: "User not found" });
  if (!verifyPassword)
    return res
      .status(400)
      .json({ message: "Password or username is incorrect" });
  console.log(user._id.toString());
  createJwt(res, user._id);
  return res.status(200).json({ message: "User logged in successfully", user });
});

userRoutes.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).populate("blogs");
    return res.status(200).json({ message: "All users fetched", data: users });
  } catch (error) {
    console.log(error);
  }
});

export { userRoutes };
