import { Router } from "express";
import { LoginUser } from "../controllers/auth/login";
import { RegisterUser } from "../controllers/auth/register";
import { body } from "express-validator";
import { passwordConfig, stringConfig } from "../utils/input-validation";

const authRouter = Router();

authRouter.post(
  "/login",
  body("email").isEmail(),
  body("password").isStrongPassword(passwordConfig),
  LoginUser,
);
authRouter.post(
  "/register",
  body("email").isEmail(),
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  body("referenceNumber").optional().isString().isLength(stringConfig),
  body("password").isStrongPassword(passwordConfig),
  RegisterUser,
);

export default authRouter;
