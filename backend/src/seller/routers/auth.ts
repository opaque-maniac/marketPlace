import { Router } from "express";
import { body } from "express-validator";
import { login, register } from "../handlers/auth";
import { stringConfig, passwordConfig } from "../../utils/globals";

const router = Router();

// register
router.post(
  "/register",
  body("email").isEmail(),
  body("name").isString().isLength(stringConfig),
  body("password").isStrongPassword(passwordConfig),
  register,
);

// login
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isStrongPassword(passwordConfig),
  login,
);

export default router;
