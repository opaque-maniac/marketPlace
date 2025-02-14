import { Router } from "express";
import changeEmailRouter from "./routers/changeemailrouter";
import changePasswordRouter from "./routers/changepasswordrouter";
import resetPasswordRouter from "./routers/resetpasswordrouter";
import verifyEmailRouter from "./routers/verifyemailrouter";
import { fetchEmail } from "./handlers/generic";
import { allowIfAuthenticated } from "../middleware/auth-middleware";

const router = Router();

router.use("/change-email", changeEmailRouter);
router.use("/change-password", changePasswordRouter);
router.use("/reset-password", resetPasswordRouter);
router.use("/verify-email", verifyEmailRouter);
router.get("/fetch-email", allowIfAuthenticated, fetchEmail);

export default router;
