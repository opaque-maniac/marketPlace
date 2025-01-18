import { Router } from "express";
import { body } from "express-validator";
import {
  stringConfig,
  createStorage,
  productCategories,
} from "../../utils/globals";
import {
  allowIfAuthenticated,
  isStaff,
} from "../../middleware/auth-middleware";
import multer from "multer";
import {
  deleteProduct,
  fetchIndividualProduct,
  fetchProducts,
  updateProduct,
} from "../handlers/products";
import { fetchProductComments } from "../handlers/comments";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

// File upload
const productStorage = createStorage("uploads");
const productUpload = multer({ storage: productStorage });

// Fetch products
router.get("/", fetchProducts);

// Fetch individual product
router.get("/:id", fetchIndividualProduct);

// Fetch product comments
router.get("/:id/comments", fetchProductComments);

// Update product
router.put(
  "/:id",
  body("name").isString().isLength(stringConfig),
  body("description").isString().isLength(stringConfig),
  body("category").isString().isIn(productCategories),
  body("inventory").isNumeric(),
  body("price").isNumeric(),
  productUpload.array("images"),
  updateProduct,
);

// Delete product
router.delete("/:id", deleteProduct);

export default router;
