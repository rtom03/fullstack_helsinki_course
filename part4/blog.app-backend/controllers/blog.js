import express from "express";
import { Blog } from "../models/Blog.js";
import { error, info } from "../utils/logger.js";
import { User } from "../models/User.js";
import dotenv from "dotenv";
import { tokenExtractor } from "../middleware/auth.middleware.js";

dotenv.config();

const blogRouter = express.Router();

const env = process.env.NODE_ENV;

blogRouter.post("/create-blog", tokenExtractor, async (req, res) => {
  let { title, author, url, likes } = req.body;
  const decodedToken = req.decodedToken;

  console.log("DECODED TOKEN>>>:", token);
  likes !== undefined ? Number(likes) : 0;
  try {
    if (!decodedToken.userId) {
      return res.status(400).json({ message: "Invalid token" });
    } else if (!title || !url) {
      return res.status(400).json({ message: "title & url are required" });
    }
    const user = await User.findById(decodedToken.userId);
    console.log(user);
    const newBlog = new Blog({
      title,
      author,
      url,
      likes,
      user: decodedToken.userId,
    });
    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    return res.status(201).json({
      data: newBlog,
      decodedToken,
      message: "New blog created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
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

blogRouter.delete("/delete-blog/:id", tokenExtractor, async (req, res) => {
  const blogId = req.params.id;
  const decodedToken = req.decodedToken;
  const user = await User.findById(decodedToken.userId).populate("blogs");
  let idx = 0;
  console.log(user.blogs.length);
  try {
    if (!decodedToken.userId) {
      return res.status(400).json({ message: "Unauthorize user" });
    } else if (decodedToken.userId)
      while (
        user.blogs.length !== 0 &&
        user.blogs[idx]._id.toString() !== blogId
      ) {
        idx++;
        if (idx === user.blogs.length) {
          return res.status(400).json({
            message: "not found or you're not authorize to delete this data",
          });
        }
      }
    await Blog.findByIdAndDelete(blogId);
    return res.status(204).json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

blogRouter.put(
  "/update-blog/:id",
  // tokenExtractor,
  async (req, res) => {
    const { likes } = req.body;
    try {
      const blog = await Blog.findById(req.params.id);
      // console.log(blog);
      if (!blog) {
        return res.status(400).json({ error: "Blog not found" });
      }
      blog.likes = Number(likes || 0) + 1;
      await blog.save();
      res.status(201).json({
        message: `Liked ${blog.title} blog by ${blog.author}`,
        data: blog,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

/// blog routes for test
export { blogRouter };
