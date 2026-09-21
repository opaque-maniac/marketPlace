import express from "express";
import morgan from "morgan";
import cors from "cors";
import { slowDown } from "express-slow-down";
import path from "path";
import dotenv from "dotenv";
import http from "node:http";
import appRouter from "./routers/app";
import errorHandler from "./errors/error-handler";

// import { sendComplaint } from "./handler";
// import { body } from "express-validator";
// import { initializeSocketServer } from "./websockets/sockets";
// import rateLimit from "express-rate-limit";

const app = express();
const server = http.createServer(app);

dotenv.config();
// initializeSocketServer(server);

// Implimenting some middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Options for cors
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

/*
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // limit: 10,
  message: "Too many requests",
});
*/

const slowDowner = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 20,
  delayMs: (hits) => hits * 1000,
});

// Implimenting cors
app.use(cors(corsOptions));
app.use(slowDowner);

// Routes
app.use("/api/v1", appRouter);

// Error Handling
app.use(errorHandler);

export default server;
