import { test, describe } from "node:test";
import assert from "node:assert";
import { dummy } from "./list_helper.js";

describe("dummy", () => {
  test("of one value is the value itself", () => {
    assert.strictEqual(dummy(1), 1);
  });
});
