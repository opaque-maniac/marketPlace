import { Router } from "express";
import { body } from "express-validator";
import {
  stringConfig,
  createStorage,
  productCategories,
} from "../../utils/globals";
import {
  allowIfAuthenticated,
  isProductOwner,
  isSeller,
} from "../../middleware/auth-middleware";
import multer from "multer";
import {
  createProduct,
  deleteIndividualProduct,
  fetchIndividualProduct,
  fetchProducts,
  searchProducts,
  updateIndividualProduct,
} from "../handlers/products";
import {
  fetchIndividualComment,
  fetchProductComments,
} from "../handlers/comments";

const router = Router();

// File upload
const productStorage = createStorage("uploads/products");
const productUpload = multer({ storage: productStorage });

// Product management
router.get("/", allowIfAuthenticated, isSeller, fetchProducts);
router.post(
  "/",
  allowIfAuthenticated,
  isSeller,
  body("name").isString().isLength(stringConfig),
  body("description").isString().isLength({ min: 10, max: 255 }),
  body("price").isNumeric(),
  body("inventory").isNumeric(),
  body("discount").isNumeric().optional(),
  body("category").isIn(productCategories),
  productUpload.array("images", 5),
  createProduct,
);
router.get(
  "/:id",
  allowIfAuthenticated,
  isSeller,
  isProductOwner,
  fetchIndividualProduct,
);
router.put(
  "/:id",
  allowIfAuthenticated,
  isSeller,
  isProductOwner,
  body("name").isString().isLength(stringConfig),
  body("description").isString().isLength({ min: 10, max: 255 }),
  body("price").isNumeric(),
  body("inventory").isNumeric(),
  body("discount").isNumeric().optional(),
  body("category").isIn(productCategories),
  productUpload.array("images", 5),
  updateIndividualProduct,
);
router.delete(
  "/:id",
  allowIfAuthenticated,
  isSeller,
  isProductOwner,
  deleteIndividualProduct,
);
router.post("/search", allowIfAuthenticated, isSeller, searchProducts);

// Comment management
router.get(
  "/:id/comments",
  allowIfAuthenticated,
  isSeller,
  isProductOwner,
  fetchProductComments,
);
router.get(
  "/:id/comments/:commentId",
  allowIfAuthenticated,
  isSeller,
  isProductOwner,
  fetchIndividualComment,
);

export default router;
