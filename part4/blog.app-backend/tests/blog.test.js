import test, { after, beforeEach, describe } from "node:test";
import assert, { strictEqual } from "node:assert";
import { app } from "./../app.js";
import supertest from "supertest";
import { Blog } from "../models/Blog.js";
import mongoose from "mongoose";

const api = supertest(app);

const data = [
  {
    title: "Development",
    author: "rtom",
    url: "http://localhost:8000/api-post",
    likes: 100000,
    __v: 0,
  },
  {
    title: "Web Development",
    author: "rtom03",
    url: "http://localhost:8000/api-post",
    __v: 0,
  },
];

const initialData = [
  {
    _id: "68a2f96b18c6337ade0f1655",
    title: "Web Development",
    author: "rtom",
    url: "http://localhost:8000/api-post",
    likes: 100000,
    __v: 0,
  },
  {
    _id: "68a4b2b9107d3b764742a255",
    title: "Mobile Development",
    author: "garland",
    likes: 100,
    __v: 0,
  },
];

describe("blog handler", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    let newObject = new Blog(initialData[0]);
    newObject.save();
    newObject = new Blog(initialData[1]);
    await newObject.save();
  });

  test("return blog list", async () => {
    api
      .get("/api")
      .expect(200)
      .expect("Content-Type", /aplication\/json/);

    const res = await Blog.find({});
    console.log(res);

    assert.strictEqual(res.length, res.length);
  });

  test("verify _id === id", async () => {
    const res = await Blog.find({});
    const json = res[0].toJSON();

    assert.strictEqual(Object.keys(json)[4], "id");
  });

  test("make a post req", async () => {
    const newBlog = new Blog(data[0]);
    await newBlog.save();
    api
      .post("/api")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /aplication\/json/);

    const res = await Blog.find({});
    assert.strictEqual(res.length, initialData.length + 1);
  });

  test("verify likes default to 0", async () => {
    const blog = new Blog(data[1]);
    await blog.save();
    api
      .post("/api")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    console.log(blog.likes);
    assert.strictEqual(blog.likes, 0);
  });

  test("validate input", async () => {
    const blog = new Blog(data[1]);
    await blog.save();
    api
      .post("/api")
      .send(blog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
