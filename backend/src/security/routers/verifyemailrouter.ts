import { Router } from "express";
import { body } from "express-validator";
import {
  verifyEmailRequest,
  verifyEmailTokenCheck,
} from "../handlers/verify-email";

const router = Router();

// request email
router.post(
  "/",
  body("email").isEmail(),
  body("role").isString().isIn(["customer", "staff", "seller"]),
  verifyEmailRequest,
);

// verify token
router.post(
  "/token",
  body("token").isString().isLength({ min: 20 }),
  verifyEmailTokenCheck,
);

export default router;
