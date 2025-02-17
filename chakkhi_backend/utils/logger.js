// utils/logger.js
import winston from "winston";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Create a custom log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Get the current directory equivalent to __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, "app.log") }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

// Handle unhandled exceptions or rejections
logger.exceptions.handle(
  new winston.transports.File({ filename: "exceptions.log" })
);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

export default logger;
