import { Router } from "express";
import authRouter from "./auth";
import onboardingRouter from "./onboarding";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/onboarding", onboardingRouter);
appRouter.use("/security", authRouter);

export default appRouter;
