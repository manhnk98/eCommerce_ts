import * as dotenv from "dotenv";
import * as convict from "convict";
import { getDefaultLibFileName } from "typescript";

dotenv.config();

export const env = convict({
  environment: {
    format: String,
    default: "development",
    env: "NODE_ENV",
    doc: "Is Production",
  },
  port: {
    format: Number,
    default: 3001,
    env: "SERVER_PORT",
    doc: "Port of server",
  },
  logColor: {
    format: String,
    default: "#6d20ab",
    env: "LOG_PRIMARY_COLOR",
    doc: "Color of log request",
  },
  rateLimit: {
    format: Number,
    default: 1000,
    env: "RATE_LIMIT_MAX",
    doc: "Rate limit request / IP",
  },
  mongodb: {
    host: {
      format: String,
      default: "localhost",
      env: "MONGODB_HOST",
      doc: "Mongodb host",
    },
    port: {
      format: Number,
      default: 3307,
      env: "MONGODB_PORT",
      doc: "Mongodb port",
    },
    username: {
      format: String,
      default: "root",
      env: "MONGODB_USERNAME",
      doc: "Mongodb username",
    },
    password: {
      format: String,
      default: "",
      env: "MONGODB_PASSWORD",
      doc: "Mongodb password",
    },
    database: {
      format: String,
      default: "eCommerce",
      env: "MONGODB_DATABASE",
      doc: "Mongodb database",
    },
    isLogging: {
      format: Boolean,
      default: false,
      env: "MONGODB_QUERY_LOGGING",
      doc: "For debug mongodb query",
    },
  },
});

export default env;
