import { test, describe } from "node:test";
import assert from "node:assert";
import { favouriteBlog } from "../utils/list_helper.js";

describe("favourite blog", () => {
  test("returns most likes blog", () => {
    const blogs = [
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
        title: "Web Development",
        author: "rtom03",
        url: "http://localhost:8000/api-post",
        likes: 100,
        __v: 0,
      },
      {
        _id: "68a4b2b9107d3b764742a255",
        title: "Web Development",
        author: "rtom03",
        url: "http://localhost:8000/api-post",
        likes: 20000,
        __v: 0,
      },
    ];
    assert.strictEqual(favouriteBlog(blogs), 100000);
  });
});
