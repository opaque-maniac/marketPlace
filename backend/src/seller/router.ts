import { Router } from "express";
import ordersRouter from "./routers/orders";
import productsRouter from "./routers/products";
import profileRouter from "./routers/profile";
import authRouter from "./routers/auth";

const router = Router();

router.use("/orders", ordersRouter);
router.use("/products", productsRouter);
router.use("/profile", profileRouter);
router.use("/auth", authRouter);

export default router;
