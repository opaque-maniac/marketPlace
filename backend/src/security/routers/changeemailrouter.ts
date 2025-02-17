import { Router } from "express";
import {
  changeEmailRequest,
  changeEmailVerification,
} from "../handlers/change-email";
import { body } from "express-validator";
import { allowIfAuthenticated } from "../../middleware/auth-middleware";

const router = Router();

// request email
router.post(
  "/",
  allowIfAuthenticated,
  body("email").isEmail(),
  changeEmailRequest,
);

// verify token
router.post(
  "/token",
  body("token").isString().isLength({ min: 20 }),
  changeEmailVerification,
);

export default router;
