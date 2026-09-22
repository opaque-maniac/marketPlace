import { Router } from "express";
import { OnboardSeller } from "../controllers/onboarding/seller";

const onboardingRouter = Router()

onboardingRouter.post("/seller", OnboardSeller);

export default onboardingRouter
