import express from "express";
import { Blog } from "../models/Blog.js";
import { error, info } from "../utils/logger.js";

const blogRouter = express.Router();

blogRouter.post("/", (req, res) => {
  const { title, author, url, likes } = req.body;

  const newBlog = new Blog({ title, author, url, likes });
  newBlog
    .save()
    .then((blog) => {
      res.json({ data: blog, message: info("New blog created successfully") });
    })
    .catch((err) => {
      error(`an error occured while creating new blog: ${err}`);
    });
});

blogRouter.get("/", (req, res) => {
  Blog.find({})
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      error(`an error occured while fetching data: ${err}`);
    });
});

export { blogRouter };
