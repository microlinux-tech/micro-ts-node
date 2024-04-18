import developmentConfig from "./development";
import stagingConfig from "./staging";

const environments: any = {
  development: developmentConfig,
  staging: stagingConfig,
};

const currentEnv = process.env.APP_ENV || "development";

const config = environments[currentEnv];

export default config;
