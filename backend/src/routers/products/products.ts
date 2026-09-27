import { Router } from "express";
import customerRouter from "./customer";
import {
  allowIfAuthenticated,
  allowIfIsCustomer,
} from "../../middleware/auth-middleware";
import staffRouter from "./staff";
import sellerRouter from "./seller";
import {
  CreateProductComment,
  FetchProductComments,
} from "../../controllers/products/comments";

const productsRouter = Router();

productsRouter.use("/customers", customerRouter);
productsRouter.use("/staff", allowIfAuthenticated, staffRouter);
productsRouter.use("/seller", allowIfAuthenticated, sellerRouter);

// Product comments
customerRouter.get("/:id/comments", FetchProductComments);
customerRouter.post(
  "/:id/comments",
  allowIfAuthenticated,
  allowIfIsCustomer,
  CreateProductComment,
);

export default productsRouter;
