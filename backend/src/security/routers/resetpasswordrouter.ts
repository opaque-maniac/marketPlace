import { Router } from "express";
import { body } from "express-validator";
import { verifyEmailToken } from "../handlers/generic";
import { passwordConfig } from "../../utils/globals";
import {
  requestPasswordResetEmail,
  resetPassword,
} from "../handlers/reset-password";

const router = Router();

// request email
router.post(
  "/",
  body("email").isEmail(),
  body("role").isString().isIn(["customer", "seller", "staff"]),
  requestPasswordResetEmail,
);

// verify token
router.post(
  "/token",
  body("token").isString().isLength({ min: 20 }),
  verifyEmailToken,
);

// change email address
router.post(
  "/change",
  body("password").isStrongPassword(passwordConfig),
  body("token").isString().isLength({ min: 20 }),
  resetPassword,
);

export default router;
