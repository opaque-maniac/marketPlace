import { Router } from "express";
import {
  RequestChangeEmail,
  VerifyChangeEmailURL,
} from "../controllers/security/change-email";
import {
  ConfirmChangePassword,
  RequestChangePassword,
  VerifyChangePasswordURL,
} from "../controllers/security/change-password";
import {
  ConfirmResetPassword,
  RequestResetPassword,
  VerifyResetPasswordURL,
} from "../controllers/security/reset-password";
import {
  ConfirmVerifyEmailURL,
  RequestVerifyEmail,
} from "../controllers/security/verify-email";
import {
  ConfirmVerifyDeviceURL,
  RequestVerifyDevice,
} from "../controllers/security/verify-device";
import { allowIfAuthenticated } from "../middleware/auth-middleware";

const securityRouter = Router();

// Verify email
securityRouter.post("/verify-email", RequestVerifyEmail);
securityRouter.put("/verify-email", ConfirmVerifyEmailURL);

// Verify device
securityRouter.post("/verify-device", RequestVerifyDevice);
securityRouter.put("/verify-device", ConfirmVerifyDeviceURL);

// Reset password routes
securityRouter.post("/reset-password", RequestResetPassword);
securityRouter.put("/reset-password", VerifyResetPasswordURL);
securityRouter.patch("/reset-password", ConfirmResetPassword);

// Change email routes
securityRouter.post("/change-email", allowIfAuthenticated, RequestChangeEmail);
securityRouter.put("/change-email", allowIfAuthenticated, VerifyChangeEmailURL);

// Change password routes
securityRouter.post(
  "/change-password",
  allowIfAuthenticated,
  RequestChangePassword,
);
securityRouter.put(
  "/change-password",
  allowIfAuthenticated,
  VerifyChangePasswordURL,
);
securityRouter.patch(
  "/change-password",
  allowIfAuthenticated,
  ConfirmChangePassword,
);

export default securityRouter;
