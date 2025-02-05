import { Router } from "express";
import { body } from "express-validator";
import { verifyEmailToken } from "../handlers/generic";
import { changePassword } from "../handlers/change-password";
import { passwordConfig } from "../../utils/globals";
import { requestPasswordResetEmail } from "../handlers/reset-password";

const router = Router();

// request email
router.post("/", requestPasswordResetEmail);

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
