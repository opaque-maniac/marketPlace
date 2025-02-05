import { Router } from "express";
import {
  changeEmail,
  requestVerificationEmail,
} from "../handlers/change-email";
import { body } from "express-validator";
import { allowIfAuthenticated } from "../../middleware/auth-middleware";
import { verifyEmailToken } from "../handlers/generic";

const router = Router();

// middleware
router.use(allowIfAuthenticated);

// request email
router.post("/", requestVerificationEmail);

// verify token
router.post(
  "/verify",
  body("token").isString().isLength({ min: 20 }),
  verifyEmailToken,
);

// change email address
router.post(
  "/change",
  body("email").isEmail(),
  body("token").isString().isLength({ min: 20 }),
  changeEmail,
);

export default router;
