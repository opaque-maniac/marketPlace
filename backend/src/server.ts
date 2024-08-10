import express from "express";
import morgan from "morgan";
import cors from "cors";
import { allowIfActive } from "./middleware/auth-middleware";
import { refreshToken } from "./utils/publicHandlers";
import customerRouter from "./customer/router";
import sellerRouter from "./seller/router";
import { rateLimiter } from "express-rate-limiter";
import { slowDown } from "express-slow-down";

const app = express();

// Implimenting some middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Options for cors
const corsOptions = {
  origin: ["http://localhost:5173"],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const limiter = rateLimiter({
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
app.use(slowDowner);
app.use("/api/customers", customerRouter);
app.use("/api/seller", sellerRouter);

// Token refresh route
app.post("/api/tokenrefresh", limiter, refreshToken);

export default app;
