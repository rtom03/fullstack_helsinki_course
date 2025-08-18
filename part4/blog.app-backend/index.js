import { app } from "./app.js";
import { PORT } from "./utils/config.js";
import { info } from "./utils/logger.js";

app.listen(PORT, () => {
  info(`server up and running on http://localhost:${PORT}`);
});
