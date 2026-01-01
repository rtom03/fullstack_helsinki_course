import { test, describe } from "node:test";
import assert from "node:assert";
import { totalLikes } from "../utils/list_helper.js";

describe("all likes", () => {
  test("return all likes", () => {
    const allLikes = [
      {
        _id: "68a4b2b9107d3b764742a255",
        title: "Web Development",
        author: "rtom03",
        url: "http://localhost:8000/api-post",
        likes: 100,
        __v: 0,
      },
    ];

    assert.strictEqual(totalLikes(allLikes), 100);
  });
});
