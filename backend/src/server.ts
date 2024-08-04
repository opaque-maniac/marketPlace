import express from "express";
import morgan from "morgan";
import ErrorHandler from "./utils/errorHandler";
import cors from "cors";
import customerRouter from "./customer/router";
import sellerRouter from "./seller/router";
import staffRouter from "./staff/router";
import path from "path";
import slowDown from "express-slow-down";

const app = express();

// Implimenting some middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const limiter = slowDown({
  windowMs: 15 * 60 * 1000, // 5 minutes
  delayAfter: 15,
  delayMs: (hits) => hits * 200,
  maxDelayMs: 5000, // max global delay of 5 seconds
});

// Rate Limiter
app.use(limiter);

// Options for cors
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3001"],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const productDir = path.join(__dirname, "../productImages");
const sellerDir = path.join(__dirname, "../sellerImages");

// Implimenting cors
app.use(cors(corsOptions));

app.use("/productImages", express.static(productDir));
app.use("/sellerImages", express.static(sellerDir));

app.use("/api-client", customerRouter);
app.use("/api-seller", sellerRouter);
app.use("/api-staff", staffRouter);

app.use((err, req, res, next) => {
  ErrorHandler(err, req, res, next);
});

export default app;
