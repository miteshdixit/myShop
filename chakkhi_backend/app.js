import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import appRouter from "./routes/index.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

// Middleware for secure HTTP headers
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});
app.use(limiter);

app.use("/api/v1", appRouter);

export default app;
