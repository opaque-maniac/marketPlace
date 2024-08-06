import { Router } from "express";
import { body } from "express-validator";
import {
  stringConfig,
  passwordConfig,
  createStorage,
  productCategories,
} from "../utils/globals";
import {
  allowIfAuthenticated,
  isCustomer,
  isProfileOwner,
} from "../middleware/auth-middleware";
import multer from "multer";
import { login, register } from "./handlers/auth";
import { deleteProfile, fetchProfile, updateProfile } from "./handlers/profile";
import {
  fetchIndividualProduct,
  fetchProducts,
  searchProduct,
} from "./handlers/products";
import {
  createProductComment,
  deleteProductComment,
  fetchIndividualComment,
  fetchProductComments,
} from "./handlers/comments";
import { fetchCart, fetchCartItem } from "./handlers/cart";

const customerRouter = Router();

// File upload
const customerStorage = createStorage("uploads/customers");

const upload = multer({ storage: customerStorage });

// For authentication
customerRouter.post(
  "/register",
  body("email").isEmail(),
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  body("password").isStrongPassword(passwordConfig),
  register
);
customerRouter.post(
  "/login",
  body("email").isEmail(),
  body("password").isStrongPassword(passwordConfig),
  login
);

// For profile managemnt
customerRouter.get(
  "/profile/:id",
  allowIfAuthenticated,
  isCustomer,
  isProfileOwner,
  fetchProfile
);
customerRouter.put(
  "/profile/:id",
  allowIfAuthenticated,
  isCustomer,
  isProfileOwner,
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  body("phone")
    .isString()
    .matches(/^[0-9]{10}$/)
    .optional(),
  body("address").isString().isLength(stringConfig).optional(),
  upload.single("image"),
  updateProfile
);
customerRouter.delete(
  "/profile/:id",
  allowIfAuthenticated,
  isCustomer,
  isProfileOwner,
  deleteProfile
);

// For product management
customerRouter.get("/products", fetchProducts);
customerRouter.get("/products/:id", fetchIndividualProduct);
customerRouter.get("/products/search", searchProduct);

// For comment managemet
customerRouter.get("/products/:id/comments", fetchProductComments);
customerRouter.post(
  "/products/:id/comments",
  allowIfAuthenticated,
  isCustomer,
  body("message").isString().isLength(stringConfig),
  createProductComment
);
customerRouter.get("/products/:id/comments/:commentId", fetchIndividualComment);
customerRouter.delete(
  "/products/:id/comments/:commentId",
  allowIfAuthenticated,
  isCustomer,
  deleteProductComment
);

// For cart management
customerRouter.get("/cart", allowIfAuthenticated, isCustomer, fetchCart);
customerRouter.get(
  "/cart/:id",
  allowIfAuthenticated,
  isCustomer,
  fetchCartItem
);

export default customerRouter;
