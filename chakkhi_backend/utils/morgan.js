import morgan from "morgan";
import logger from "./logger.js";

// Create a custom stream to send morgan logs to winston
const stream = {
  write: (message) => logger.http(message.trim()),
};

// Setup morgan logging format
const morganMiddleware = morgan("combined", { stream });

export default morganMiddleware; // Use export instead of module.exports
