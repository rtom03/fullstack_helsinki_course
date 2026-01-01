import test, { after, beforeEach, describe } from "node:test";
import assert from "node:assert";
import { app } from "./../app.js";
import supertest from "supertest";
import { Blog } from "../models/Blog.js";
import mongoose from "mongoose";
import { tokenExtractor } from "../middleware/auth.middleware.js";

const api = supertest(app);

const initialData = [
  {
    title: "Web Development",
    author: "rtom",
    url: "http://localhost:8000/api-post",
    likes: 1,
  },
];

describe("blog handler", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    let newObject = new Blog(initialData[0]);
    await newObject.save();
  });

  test("return blog list", tokenExtractor, async () => {
    await api
      .get("/api")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const res = await Blog.find({});
    assert.strictEqual(res.length, initialData.length);
  });

  test("verify _id === id", async () => {
    const res = await Blog.find({});
    const json = res[0].toJSON();
    assert.strictEqual(Object.keys(json)[4], "id");
  });

  test("make a post req", tokenExtractor, async () => {
    const newBlog = {
      title: "Linux Administrator",
      author: "Chris",
      url: "http://localhost:8000/api-post",
      likes: 1,
    };

    await api
      .post("/api/")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await Blog.find({});
    // console.log(res);
    assert.strictEqual(res.length, initialData.length + 1);
  });

  test("verify likes default to 0", tokenExtractor, async () => {
    const newBlog = {
      title: "Development",
      author: "rtom",
      url: "http://localhost:8000/api-post",
    };

    await api
      .post("/api/")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const res = await Blog.find({});
    // console.log(res);
    assert.strictEqual(res[1].likes, 0);
  });

  test("validate input", tokenExtractor, async () => {
    const newBlog = {
      title: "Development",
      author: "rtom",
    };
    await api
      .post("/api/")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("delete blog", tokenExtractor, async () => {
    const blog = await Blog.find({});
    await api.delete(`/api/${blog[0].id}`).expect(204);
    const res = await Blog.find({});
    assert.strictEqual(res.length, 0);
  });

  test("update blog likes", tokenExtractor, async () => {
    let blog = await Blog.find({});
    // console.log(blog[0].likes);
    blog[0].likes += 1;
    // await blog.save();
    await api
      .put(`/api/${blog[0].id}`)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    console.log("LIKES", blog);

    assert.strictEqual(blog[0].likes, initialData[0].likes + 1);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
