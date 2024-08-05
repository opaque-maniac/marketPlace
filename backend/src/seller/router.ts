import { Router } from "express";
import { body } from "express-validator";
import { login, register } from "./handlers/auth";
import { stringConfig, passwordConfig } from "../utils/globals";
import {
  allowIfAuthenticated,
  isProfileOwner,
} from "../middleware/auth-middleware";
import { fetchProfile } from "./handlers/profile";

const sellerRouter = Router();

// For authentication
sellerRouter.post(
  "/register",
  body("email").isEmail(),
  body("name").isString().isLength(stringConfig),
  body("password").isStrongPassword(passwordConfig),
  register
);
sellerRouter.post(
  "/login",
  body("email").isEmail(),
  body("password").isStrongPassword(passwordConfig),
  login
);

// Profile management
sellerRouter.get(
  "profile/:id",
  allowIfAuthenticated,
  isProfileOwner,
  fetchProfile
);

export default sellerRouter;
