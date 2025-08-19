import { test, describe } from "node:test";
import assert from "node:assert";
import { mostLikes } from "../utils/list_helper.js";

describe("most likes", () => {
  test("return author & most likes", () => {
    const blogs = [
      {
        author: "rtom",
        blogs: [
          {
            _id: "68a4b2b9107d3b764742a255",
            title: "Web Development",
            url: "http://localhost:8000/api-post",
            likes: 500,
            __v: 0,
          },
          {
            _id: "68a4b2b9107d3b764742a255",
            title: "Web Development",
            url: "http://localhost:8000/api-post",
            likes: 100,
            __v: 0,
          },
          {
            _id: "68a4b2b9107d3b764742a255",
            title: "Web Development",
            url: "http://localhost:8000/api-post",
            likes: 100,
            __v: 0,
          },
        ],
      },
      {
        author: "garland",
        blogs: [
          {
            _id: "68a4b2b9107d3b764742a255",
            title: "Web Development",
            url: "http://localhost:8000/api-post",
            likes: 100,
            __v: 0,
          },
          {
            _id: "68a4b2b9107d3b764742a255",
            title: "Web Development",
            url: "http://localhost:8000/api-post",
            likes: 100,
            __v: 0,
          },
        ],
      },
    ];

    assert.deepStrictEqual(mostLikes(blogs), { author: "rtom", likes: 500 });
  });
});
