import { test, describe } from "node:test";
import assert from "node:assert";
import { dummy } from "../utils/list_helper.js";

describe("dummy test", () => {
  test("of one value is the value itself", () => {
    const result = [
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
    ];

    assert.strictEqual(dummy(result, result[1]), 1);
  });
});
