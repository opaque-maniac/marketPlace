import { Router } from "express";
import authRouter from "./routers/auth";
import cartRouter from "./routers/cart";
import cartitemsRouter from "./routers/cartitems";
import ordersRouter from "./routers/orders";
import productsRouter from "./routers/products";
import profileRouter from "./routers/profile";
import sellersRouter from "./routers/sellers";
import wishlistRouter from "./routers/wishlist";
import wishlistitemsRouter from "./routers/wishlistitems";

const router = Router();

router.use("/auth", authRouter);
router.use("/cart", cartRouter);
router.use("/cartitems", cartitemsRouter);
router.use("/orders", ordersRouter);
router.use("/products", productsRouter);
router.use("/profile", profileRouter);
router.use("/sellers", sellersRouter);
router.use("/wishlist", wishlistRouter);
router.use("/wishlistitems", wishlistitemsRouter);

export default router;
