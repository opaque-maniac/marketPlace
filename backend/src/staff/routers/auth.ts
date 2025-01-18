import { Router } from "express";
import { body } from "express-validator";
import { stringConfig, passwordConfig } from "../../utils/globals";
import { login, registerStaff } from "../handlers/auth";

const router = Router();

// login
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isStrongPassword(passwordConfig),
  login,
);

// register
router.post(
  "/register",
  body("email").isEmail(),
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  body("password").isStrongPassword(passwordConfig),
  body("role").isString().isIn(["ADMIN", "STAFF", "MANAGER"]),
  registerStaff,
);

export default router;
