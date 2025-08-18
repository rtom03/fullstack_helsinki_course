import { error } from "../utils/logger.js";

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorResponse = (err, req, res, next) => {
  error(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ err: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ err: err.message });
  }
  next(err);
};

export { unknownEndpoint, errorResponse };
