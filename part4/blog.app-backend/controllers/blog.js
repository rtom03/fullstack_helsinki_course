import express from "express";
import { Blog } from "../models/Blog.js";
import { error, info } from "../utils/logger.js";

const blogRouter = express.Router();

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const newBlog = new Blog({ title, author, url, likes });
  await newBlog.save();
  return res
    .status(201)
    .json({ data: newBlog, message: "New blog created successfully" });
});

blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    return res
      .status(200)
      .json({ data: blogs, message: "New blog created successfully" });
  } catch (error) {
    console.log(error);
  }
});

export { blogRouter };
