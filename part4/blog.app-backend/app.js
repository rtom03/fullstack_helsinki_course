import express from "express";
import mongoose from "mongoose";
import { error, info, requestLogger } from "./utils/logger.js";
import { MONGODB_URI } from "./utils/config.js";
import { blogRouter } from "./controllers/blog.js";
import { errorResponse, unknownEndpoint } from "./middleware/errorHandler.js";
import { userRoutes } from "./controllers/user.js";
import { tokenExtractor } from "./middleware/auth.middleware.js";
import cors from "cors";

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
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", blogRouter);

app.use(requestLogger);
app.use(unknownEndpoint);
app.use(errorResponse);

export { app };
