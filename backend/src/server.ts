import express from "express";
import morgan from "morgan";
import cors from "cors";
import { allowIfActive } from "./middleware/auth-middleware";
import { refreshToken } from "./utils/publicHandlers";

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

// Implimenting cors
app.use(cors(corsOptions));
app.use(allowIfActive);
app.post("/api/tokenrefresh", refreshToken);

export default app;
