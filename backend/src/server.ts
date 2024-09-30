// Server entry point
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { allowIfActive } from "./middleware/auth-middleware";
import { refreshToken } from "./utils/publicHandlers";
import customerRouter from "./customer/router";
import sellerRouter from "./seller/router";
import rateLimit from "express-rate-limit";
import { slowDown } from "express-slow-down";
import staffRouter from "./staff/router";
import errorHandler from "./utils/errorHandler";
import { sendComplaints } from "./seller/handlers/complaints";
import { stringConfig } from "./utils/globals";
import { body } from "express-validator";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { onConnectSocket } from "./sockets/router";
import { socketAuthMiddleware } from "./sockets/authmiddleware";

const app = express();

// Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Implimenting some middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Options for cors
const corsOptions = {
  origin: ["http://localhost:5173"],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: "Too many requests",
});

const slowDowner = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 20,
  delayMs: (hits) => hits * 1000,
});

// Implimenting cors
app.use(cors(corsOptions));
app.use(allowIfActive);
// app.use(slowDowner);
app.use("/customers", customerRouter);
app.use("/seller", sellerRouter);
app.use("/staff", staffRouter);

// Token refresh route
app.post("/api/tokenrefresh", limiter, refreshToken);
app.post(
  "/complaints",
  limiter,
  body("email").isEmail(),
  body("name").isString().isLength(stringConfig),
  body("phone")
    .isString()
    .matches(/^[0-9]+$/)
    .isLength({ min: 10, max: 10 }),
  body("message").isString().isLength(stringConfig),
  sendComplaints
);

app.use(errorHandler);

// Websockets
io.use(socketAuthMiddleware);
io.on("connection", onConnectSocket);

export default server;
