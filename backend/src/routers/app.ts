import { Router } from "express";
import authRouter from "./auth";
import onboardingRouter from "./onboarding";
import productsRouter from "./products/products";
import cartRouter from "./cart";
import wishlistRouter from "./wishlist";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/onboarding", onboardingRouter);
appRouter.use("/security", authRouter);
appRouter.use("/products", productsRouter);
appRouter.use("/cart", cartRouter);
appRouter.use("/wishlist", wishlistRouter);

export default appRouter;
