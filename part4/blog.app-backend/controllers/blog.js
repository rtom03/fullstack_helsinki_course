import express from "express";
import { Blog } from "../models/Blog.js";
import { error, info } from "../utils/logger.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { tokenExtractor } from "../middleware/auth.middleware.js";

dotenv.config();

const blogRouter = express.Router();

blogRouter.post("/create-blog", tokenExtractor, async (req, res) => {
  let { title, author, url, likes } = req.body;
  const decodedToken = req.decodedToken;
  // console.log("DECODED TOKEN:", decodedToken);
  likes !== undefined ? Number(likes) : 0;
  try {
    if (!decodedToken.id) {
      return res.status(400).json({ message: "Invalid token" });
    } else if (!title || !url) {
      return res.status(400).json({ message: "title & url are required" });
    }
    const user = await User.findById(decodedToken.id);
    // console.log(user);
    const newBlog = new Blog({
      title,
      author,
      url,
      likes,
      user: decodedToken.id,
    });
    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    return res
      .status(201)
      .json({ data: newBlog, message: "New blog created successfully" });
  } catch (error) {
    res.status(500).json({
      data: error,
      message: "an error occured while creating post... please try again",
    });
  }
});

blogRouter.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    return res
      .status(200)
      .json({ data: blogs, message: "all blogs fetched successfully" });
  } catch (error) {
    console.log(error);
  }
});

blogRouter.delete("/remove-blog/:id", tokenExtractor, async (req, res) => {
  const decodedToken = req.decodedToken;
  const user = await User.findById(decodedToken.id).populate("blogs");
  let count = 0;
  // console.log(user.blogs[1]._id.toString(), req.params.id);
  try {
    if (!decodedToken.id) {
      return res.status(400).json({ message: "Invalid token" });
    } else if (decodedToken.id)
      while (user.blogs[count]._id.toString() !== req.params.id) {
        count++;
        if (count === user.blogs.length) {
          return res.status(400).json({
            message: "not found or you're not authorize to delete this data",
          });
        }
      }
    await Blog.findByIdAndDelete(req.params.id);
    return res.status(204).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

blogRouter.put("/update-blog/:id", tokenExtractor, async (req, res) => {
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
