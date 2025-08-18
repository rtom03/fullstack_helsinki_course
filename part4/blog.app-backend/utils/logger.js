const info = (params) => {
  console.log(...params);
};

const error = (params) => {
  console.error(...params);
};

const requestLogger = (req, res, next) => {
  info(`Method: ${req.method}`);
  info(`Request Path: ${req.path}`);
  info(`Body: ${req.body}`);
  next();
};

export { info, error, requestLogger };
