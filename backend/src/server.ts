import express from "express";
import morgan from "morgan";
import ErrorHandler from "./utils/errorHandler";
import cors from "cors";
import customerRouter from "./customer/router";
import sellerRouter from "./seller/router";
import staffRouter from "./staff/router";
import path from "path";

const app = express();

// Implimenting some middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Options for cors
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const productDir = path.join(__dirname, "../productImages");

// Implimenting cors
app.use(cors(corsOptions));

app.use("/productImages", express.static(productDir));

app.use("/api-client", customerRouter);
app.use("/api-seller", sellerRouter);
app.use("/api-staff", staffRouter);

app.use((err, req, res, next) => {
  ErrorHandler(err, req, res, next);
});

export default app;
