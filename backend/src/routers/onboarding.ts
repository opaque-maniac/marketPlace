import { Router } from "express";
import { OnboardSeller } from "../controllers/onboarding/seller";
import { body } from "express-validator";
import { passwordConfig, stringConfig } from "../utils/input-validation";

const onboardingRouter = Router();

onboardingRouter.post(
  "/seller",
  body("name").isString().isLength(stringConfig),
  body("phone")
    .optional()
    .isString()
    .matches(/^[0-9]{10}$/),
  body("address").isString().isLength(stringConfig).optional(),
  body("bio").optional().isString().isLength({ min: 10, max: 500 }),
  body("ownerData.email").isEmail(),
  body("ownerData.firstName").isString().isLength(stringConfig),
  body("ownerData.lastName").isString().isLength(stringConfig),
  body("ownerData.password").isStrongPassword(passwordConfig),
  OnboardSeller,
);

export default onboardingRouter;
