import { Router } from "express";
import { body } from "express-validator";
import { stringConfig, passwordConfig, createStorage } from "../utils/globals";
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
import {
  addToCart,
  emptyCart,
  fetchCart,
  fetchCartCount,
  fetchCartItem,
  orderAllCartItems,
  orderCartItem,
  removeFromCart,
} from "./handlers/cart";
import {
  addToWishlist,
  emptyWishlist,
  fetchWishlist,
  fetchWishlistCount,
  fetchWishlistItem,
  removeFromWishlist,
} from "./handlers/wishlist";
import {
  cancelOrder,
  fetchIndividualOrder,
  fetchOrderItems,
  fetchOrders,
} from "./handlers/orders";

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
customerRouter.put(
  "/cart",
  allowIfAuthenticated,
  isCustomer,
  orderAllCartItems
);
customerRouter.delete("/cart", allowIfAuthenticated, isCustomer, emptyCart);
customerRouter.post("/cart/:id", allowIfAuthenticated, isCustomer, addToCart);
customerRouter.get(
  "/cart/:id",
  allowIfAuthenticated,
  isCustomer,
  fetchCartItem
);
customerRouter.put(
  "/cart/:id",
  allowIfAuthenticated,
  isCustomer,
  orderCartItem
);
customerRouter.delete(
  "/cart/:id",
  allowIfAuthenticated,
  isCustomer,
  removeFromCart
);
customerRouter.get(
  "/cartcount",
  allowIfAuthenticated,
  isCustomer,
  fetchCartCount
);

// For wishlist management
customerRouter.get(
  "/wishlist",
  allowIfAuthenticated,
  isCustomer,
  fetchWishlist
);
customerRouter.delete(
  "/wishlist",
  allowIfAuthenticated,
  isCustomer,
  emptyWishlist
);
customerRouter.post(
  "/wishlist/:id",
  allowIfAuthenticated,
  isCustomer,
  addToWishlist
);
customerRouter.get(
  "/wishlist/:id",
  allowIfAuthenticated,
  isCustomer,
  fetchWishlistItem
);
customerRouter.delete(
  "/wishlist/:id",
  allowIfAuthenticated,
  isCustomer,
  removeFromWishlist
);
customerRouter.get(
  "/wishlistcount",
  allowIfAuthenticated,
  isCustomer,
  fetchWishlistCount
);

// For order management
customerRouter.get("/orders", allowIfAuthenticated, isCustomer, fetchOrders);
customerRouter.get(
  "/orders/:id",
  allowIfAuthenticated,
  isCustomer,
  fetchIndividualOrder
);
customerRouter.get(
  "/orders/:id/items",
  allowIfAuthenticated,
  isCustomer,
  fetchOrderItems
);
customerRouter.delete(
  "/orders/:id",
  allowIfAuthenticated,
  isCustomer,
  cancelOrder
);

// Add endpoints for creating orders after figuring out how to handle
// payment processing

export default customerRouter;
