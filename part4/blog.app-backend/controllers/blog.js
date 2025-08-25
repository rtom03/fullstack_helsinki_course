import express from "express";
import { Blog } from "../models/Blog.js";
import { error, info } from "../utils/logger.js";
import { User } from "../models/User.js";

const blogRouter = express.Router();

blogRouter.post("/", async (req, res) => {
  let { title, author, url, likes } = req.body;

  const user = await User.findOne({});

  likes !== undefined ? Number(likes) : 0;

  if (!title || !url) {
    return res.status(400).json({ message: "title & url are required" });
  }
  const newBlog = new Blog({ title, author, url, likes });
  newBlog.user = user.blogs.concat(user._id);
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

blogRouter.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog === null) {
      return res.status(400).json({ error: "Blog not found" });
    }
    await Blog.findByIdAndDelete(req.params.id);
    return res
      .status(204)
      .json({ message: `${blog.title} deleted successfully` });
  } catch (error) {
    console.log(error);
  }
});

blogRouter.put("/:id", async (req, res) => {
  const { likes } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    // console.log(blog);
    if (!blog) {
      return res.status(400).json({ error: "Blog not found" });
    }
    blog.likes = Number(likes || 0) + 1;
    await blog.save();
    res
      .status(201)
      .json({ message: `Liked ${blog.title} blog by ${blog.author}` });
  } catch (error) {
    console.log(error);
  }
});

export { blogRouter };
