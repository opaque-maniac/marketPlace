import { Router } from "express";
import { body } from "express-validator";
import { allowIfAuthenticated } from "../../middleware/auth-middleware";
import { verifyEmailToken } from "../handlers/generic";
import {
  changePassword,
  requestPasswordVerificationEmail,
} from "../handlers/change-password";
import { passwordConfig } from "../../utils/globals";

const router = Router();

// middleware
router.use(allowIfAuthenticated);

// request email
router.post("/", requestPasswordVerificationEmail);

// verify token
router.post(
  "/verify",
  body("token").isString().isLength({ min: 20 }),
  verifyEmailToken,
);

// change email address
router.post(
  "/change",
  body("password").isStrongPassword(passwordConfig),
  body("token").isString().isLength({ min: 20 }),
  changePassword,
);

export default router;
