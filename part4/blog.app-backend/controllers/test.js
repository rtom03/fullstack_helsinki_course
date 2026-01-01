import express from "express";
import { User } from "../models/User.js";
import { Blog } from "../models/Blog.js";

const testRoutes = express.Router();

testRoutes.post("/test/reset", async (request, response) => {
  console.log("$$$$$$$$$$$$$$$$$$");
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});
    return response.status(204).end();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "reset failed" });
  }
});

export { testRoutes };
