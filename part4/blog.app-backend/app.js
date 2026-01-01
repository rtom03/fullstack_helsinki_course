import express from "express";
import mongoose from "mongoose";
import { error, info, requestLogger } from "./utils/logger.js";
import { MONGODB_URI } from "./utils/config.js";
import { blogRouter } from "./controllers/blog.js";
import { errorResponse, unknownEndpoint } from "./middleware/errorHandler.js";
import { userRoutes } from "./controllers/user.js";
import cors from "cors";
import { testRoutes } from "./controllers/test.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("Connection to database established...");
  })
  .catch((err) => {
    error(`an error occured while connecting to mongodb url:${err}`);
  });

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use("/api", userRoutes);
app.use("/api", blogRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api", testRoutes);
}

app.use(requestLogger);
app.use(unknownEndpoint);
app.use(errorResponse);

export { app };
