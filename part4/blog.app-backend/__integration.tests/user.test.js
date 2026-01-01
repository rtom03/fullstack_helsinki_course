import test, { after, afterEach, beforeEach, describe } from "node:test";
import assert from "node:assert";
import { app } from "../app.js";
import supertest from "supertest";
import mongoose from "mongoose";
import { User } from "../models/User.js";

const api = supertest(app);

describe("user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  test("check invalid user", async () => {
    const user = {
      name: "cj",
      username: "ceejay",
      password: "1234",
    };
    await api
      .post("/api/user")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });
});
