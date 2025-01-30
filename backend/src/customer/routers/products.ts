import { Router } from "express";
import { body } from "express-validator";
import { fetchIndividualProduct, fetchProducts } from "../handlers/products";
import {
  createProductComment,
  deleteProductComment,
  fetchIndividualComment,
  fetchProductComments,
} from "../handlers/comments";
import {
  allowIfAuthenticated,
  isCustomer,
} from "../../middleware/auth-middleware";
import { stringConfig } from "../../utils/globals";

const router = Router();

// fetch products
router.get("/", fetchProducts);

// fetch individual product
router.get("/:id", fetchIndividualProduct);

// fetch comments
router.get("/:id/comments", fetchProductComments);

// create comment
router.post(
  "/:id/comments",
  allowIfAuthenticated,
  isCustomer,
  body("message").isString().isLength(stringConfig),
  createProductComment,
);

// fetch individual comment
router.get("/:id/comments/:commentId", fetchIndividualComment);

// delete comment
router.delete(
  "/:id/comments/:commentId",
  allowIfAuthenticated,
  isCustomer,
  deleteProductComment,
);

export default router;
