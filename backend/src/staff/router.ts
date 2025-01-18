import { Router } from "express";
import authRouter from "./routers/auth";
import cartRouter from "./routers/cart";
import cartitemRouter from "./routers/cartitems";
import commentsRouter from "./routers/comments";
import customerRouter from "./routers/customers";
import orderRouter from "./routers/orders";
import productsRouter from "./routers/products";
import profileRouter from "./routers/profile";
import sellerRouter from "./routers/sellers";
import staffRouter from "./routers/staff";
import wishlistRouter from "./routers/wishlist";
import wishlistitemRouter from "./routers/wishlistitems";

const router = Router();

router.use("/auth", authRouter);
router.use("/cart", cartRouter);
router.use("/cartitems", cartitemRouter);
router.use("/comments", commentsRouter);
router.use("/customers", customerRouter);
router.use("/orders", orderRouter);
router.use("/products", productsRouter);
router.use("/profile", profileRouter);
router.use("/sellers", sellerRouter);
router.use("/staff", staffRouter);
router.use("/wishlist", wishlistRouter);
router.use("/wishlistitems", wishlistitemRouter);

export default router;
