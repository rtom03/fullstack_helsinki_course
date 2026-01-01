import { app } from "./app.js";
import { PORT } from "./utils/config.js";
import { info } from "./utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

console.log("NODE_ENV =", process.env.NODE_ENV);

app.listen(PORT, () => {
  info(`server up and running on http://localhost:${PORT}`);
});
