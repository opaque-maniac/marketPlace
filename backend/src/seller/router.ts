import { Router } from "express";
import { body } from "express-validator";
import { login, register } from "./handlers/auth";
import {
  stringConfig,
  passwordConfig,
  createStorage,
  productCategories,
} from "../utils/globals";
import {
  allowIfAuthenticated,
  isProductOwner,
  isProfileOwner,
  isSeller,
} from "../middleware/auth-middleware";
import { deleteProfile, fetchProfile, updateProfie } from "./handlers/profile";
import multer from "multer";
import {
  createProduct,
  deleteIndividualProduct,
  fetchIndividualProduct,
  fetchProducts,
  searchProducts,
  updateIndividualProduct,
} from "./handlers/products";
import {
  fetchIndividualOrder,
  fetchOrders,
  searchOrder,
  updateOrder,
} from "./handlers/orders";
import {
  fetchIndividualComment,
  fetchProductComments,
} from "./handlers/comments";
import { sendComplaints } from "./handlers/complaints";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: "Too many requests",
});

const sellerRouter = Router();

// File upload
const sellerStorage = createStorage("uploads/sellers");
const productStorage = createStorage("uploads/products");

const sellerUpload = multer({ storage: sellerStorage });
const productUpload = multer({ storage: productStorage });

// For authentication
sellerRouter.post(
  "/register",
  body("email").isEmail(),
  body("name").isString().isLength(stringConfig),
  body("password").isStrongPassword(passwordConfig),
  register,
);
sellerRouter.post(
  "/login",
  body("email").isEmail(),
  body("password").isStrongPassword(passwordConfig),
  login,
);

// Profile management
sellerRouter.get(
  "/profile/:id",
  allowIfAuthenticated,
  isSeller,
  isProfileOwner,
  fetchProfile,
);
sellerRouter.put(
  "/profile/:id",
  allowIfAuthenticated,
  isSeller,
  isProfileOwner,
  body("name").isString().isLength(stringConfig),
  body("email").isEmail(),
  body("phone")
    .isString()
    .matches(/^[0-9]{10}$/)
    .optional(),
  body("address").isString().isLength(stringConfig).optional(),
  sellerUpload.single("image"),
  updateProfie,
);
sellerRouter.delete(
  "/profile/:id",
  allowIfAuthenticated,
  isSeller,
  isProfileOwner,
  deleteProfile,
);

// Product management
sellerRouter.get("/products", allowIfAuthenticated, isSeller, fetchProducts);
sellerRouter.post(
  "/products",
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
sellerRouter.get(
  "/products/:id",
  allowIfAuthenticated,
  isSeller,
  isProductOwner,
  fetchIndividualProduct,
);
sellerRouter.put(
  "/products/:id",
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
sellerRouter.delete(
  "/products/:id",
  allowIfAuthenticated,
  isSeller,
  isProductOwner,
  deleteIndividualProduct,
);
sellerRouter.post(
  "/products/search",
  allowIfAuthenticated,
  isSeller,
  searchProducts,
);

// Comment management
sellerRouter.get(
  "/products/:id/comments",
  allowIfAuthenticated,
  isSeller,
  isProductOwner,
  fetchProductComments,
);
sellerRouter.get(
  "/poducts/:id/comments/commentId",
  allowIfAuthenticated,
  isSeller,
  isProductOwner,
  fetchIndividualComment,
);

// For order management
sellerRouter.get("/orders", allowIfAuthenticated, isSeller, fetchOrders);
sellerRouter.get(
  "/orders/:id",
  allowIfAuthenticated,
  isSeller,
  fetchIndividualOrder,
);
sellerRouter.put(
  "/orders/:id",
  allowIfAuthenticated,
  isSeller,
  body("status")
    .isString()
    .isIn([
      "PENDING",
      "PROCESSING",
      "SHIPPED",
      "READY",
      "DELIVERED",
      "CANCELLED",
    ]),
  updateOrder,
);
sellerRouter.post(
  "/orders/search",
  allowIfAuthenticated,
  isSeller,
  searchOrder,
);

// For complaints
sellerRouter.post(
  "/complaints",
  limiter,
  body("email").isEmail(),
  body("name").isString().isLength(stringConfig),
  body("message").isString().isLength(stringConfig),
  sendComplaints,
);

export default sellerRouter;
