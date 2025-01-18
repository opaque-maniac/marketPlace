import { Router } from "express";
import { body } from "express-validator";
import { stringConfig, passwordConfig } from "../../utils/globals";
import { login, register } from "../handlers/auth";

const router = Router();

// register
router.post(
  "/register",
  body("email").isEmail(),
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
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
