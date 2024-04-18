import devLogger from "./devLogger";
import productionLogger from "./productionLogger";
import stagingLogger from "./stagingLogger";

let logger: any = null;

if (process.env.APP_ENV === "production") {
  logger = productionLogger();
}

if (process.env.APP_ENV === "staging") {
  logger = stagingLogger();
}

if (process.env.APP_ENV === "development") {
  logger = devLogger();
}

export default logger;
