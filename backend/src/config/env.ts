import * as dotenv from "dotenv";
import * as Joi from "joi";

dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().valid("development", "production", "test").required(),
  JWT_SECRET: Joi.string().required(),
  REFRESH_HIDEOUT: Joi.string().required(),
  AUTH_KEY_HIDEOUT: Joi.string().required(),
  AUTH_BEARER: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`❌ Invalid environment variables: ${error.message}`);
}

interface EnvConfig {
  port: number;
  nodeEnv: "development" | "production" | "test";
  jwtSecret: string;
  refreshHideout: string;
  authKeyHideout: string;
  authBearer: string;
  redisUrl: string;
}

const config: EnvConfig = {
  port: envVars.PORT,
  nodeEnv: envVars.NODE_ENV,
  jwtSecret: envVars.JWT_SECRET,
  refreshHideout: envVars.REFRESH_HIDEOUT,
  authKeyHideout: envVars.AUTH_KEY_HIDEOUT,
  authBearer: envVars.AUTH_BEARER,
  redisUrl: envVars.REDIS_URL,
};

export default config;
