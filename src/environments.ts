import * as dotenv from "dotenv";
import * as convict from "convict";

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
    url: {
      format: String,
      default:
        "mongodb://root:admin@localhost:27017/eCommerce?authSource=admin",
      env: "MONGODB_CONNECT_URL",
      doc: "Mongodb connect url",
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
