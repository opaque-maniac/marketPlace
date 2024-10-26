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
  isAdmin,
  isAdminOrProfileOwner,
  isProfileOwner,
  isSeller,
  isStaff,
} from "../middleware/auth-middleware";
import multer from "multer";
import { login, registerStaff } from "./handlers/auth";
import {
  deleteProduct,
  fetchIndividualProduct,
  fetchProducts,
  searchProduct,
  updateProduct,
} from "./handlers/products";
import {
  deleteCustomer,
  disableCustomer,
  enableCustomer,
  fetchCustomers,
  fetchIndividualCustomer,
  searchCustomer,
  updateCustomer,
} from "./handlers/customers";
import {
  deleteStaff,
  disableStaff,
  enableStaff,
  fetchIndividualStaff,
  fetchStaff,
  searchStaff,
  updateStaff,
} from "./handlers/staff";
import {
  deleteSeller,
  disableSeller,
  enableSeller,
  fetchIndividualSeller,
  fetchSellerProducts,
  fetchSellers,
  searchSeller,
  updateSeller,
} from "./handlers/sellers";
import { deleteProfile, fetchProfile, updateProfile } from "./handlers/profile";
import {
  deleteOrder,
  fetchAllOrders,
  fetchIndividualOrder,
  searchOrder,
  updateOrderStatus,
} from "./handlers/orders";
import {
  deleteComment,
  fetchComments,
  fetchIndividualComment,
  fetchProductComments,
  updateComment,
} from "./handlers/comments";
import {
  deleteOrderItem,
  fetchIndividualOrderItem,
  fetchIndividualOrderItems,
  fetchOrderItems,
  makeOrderItemReady,
  searchOrderItem,
} from "./handlers/orderitems";
import {
  emptyCart,
  fetchCartItem,
  fetchUserCart,
  orderCart,
  updateCartItem,
} from "./handlers/cart";
import {
  deleteWishlistItem,
  emptyWishlist,
  fetchUserWishlist,
  fetchWishlistItem,
  fetchWishlistItems,
} from "./handlers/wishlist";

const staffRouter = Router();

// File upload
const staffStorage = createStorage("uploads/staff");
const productStorage = createStorage("uploads/products");
const customerStorage = createStorage("uploads/customers");
const sellerStorage = createStorage("uploads/sellers");

const staffUpload = multer({ storage: staffStorage });
const productUpload = multer({ storage: productStorage });
const customerUpload = multer({ storage: customerStorage });
const sellerUpload = multer({ storage: sellerStorage });

// For authentication
staffRouter.post(
  "/login",
  body("email").isEmail(),
  body("password").isStrongPassword(passwordConfig),
  login
);
staffRouter.post(
  "/register",
  body("email").isEmail(),
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  body("password").isStrongPassword(passwordConfig),
  body("role").isString().isIn(["ADMIN", "STAFF", "MANAGER"]),
  registerStaff
);

/**
 * Figure out auth later
 * Not everyone can register
 */

// For profile
staffRouter.get(
  "/profile/:id",
  allowIfAuthenticated,
  isStaff,
  isProfileOwner,
  fetchProfile
);
staffRouter.put(
  "/profile/:id",
  allowIfAuthenticated,
  isStaff,
  isProfileOwner,
  body("email").isEmail(),
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  staffUpload.single("image"),
  updateProfile
);
staffRouter.delete(
  "/profile/:id",
  allowIfAuthenticated,
  isStaff,
  isProfileOwner,
  deleteProfile
);

// For products
staffRouter.get("/products", allowIfAuthenticated, isStaff, fetchProducts);
staffRouter.get(
  "/products/:id",
  allowIfAuthenticated,
  isStaff,
  fetchIndividualProduct
);
staffRouter.get(
  "/products/:id/comments",
  allowIfAuthenticated,
  isStaff,
  fetchProductComments
);
staffRouter.put(
  "/products/:id",
  allowIfAuthenticated,
  isStaff,
  body("name").isString().isLength(stringConfig),
  body("description").isString().isLength(stringConfig),
  body("category").isString().isIn(productCategories),
  body("inventory").isNumeric(),
  body("price").isNumeric(),
  productUpload.array("images"),
  updateProduct
);
staffRouter.delete(
  "/products/:id",
  allowIfAuthenticated,
  isStaff,
  deleteProduct
);
staffRouter.post(
  "/products/discover/search",
  allowIfAuthenticated,
  isStaff,
  searchProduct
);

// For customers
staffRouter.get("/customers", allowIfAuthenticated, isStaff, fetchCustomers);
staffRouter.get(
  "/customers/:id",
  allowIfAuthenticated,
  isStaff,
  fetchIndividualCustomer
);
staffRouter.put(
  "/customers/:id",
  allowIfAuthenticated,
  isStaff,
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  body("phone")
    .isString()
    .matches(/^\d{11}$/)
    .optional(),
  body("address").isString().isLength(stringConfig).optional(),
  updateCustomer
);
staffRouter.post(
  "/customers/:id/disable",
  allowIfAuthenticated,
  isStaff,
  disableCustomer
);
staffRouter.post(
  "/customers/:id/enable",
  allowIfAuthenticated,
  isStaff,
  enableCustomer
);
staffRouter.delete(
  "/customers/:id",
  allowIfAuthenticated,
  isStaff,
  deleteCustomer
);
staffRouter.get(
  "/customers/:id/cart",
  allowIfAuthenticated,
  isStaff,
  fetchUserCart
);
staffRouter.get(
  "/customers/:id/wishlist",
  allowIfAuthenticated,
  isStaff,
  fetchUserWishlist
);
staffRouter.get(
  "/customers/discover/search",
  allowIfAuthenticated,
  isStaff,
  searchCustomer
);

// For managing staff
staffRouter.get("/staff", allowIfAuthenticated, isStaff, fetchStaff);
staffRouter.get(
  "/staff/:id",
  allowIfAuthenticated,
  isStaff,
  fetchIndividualStaff
);
staffRouter.put(
  "/staff/:id",
  allowIfAuthenticated,
  isStaff,
  isAdminOrProfileOwner,
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  body("email").isEmail(),
  staffUpload.single("image"),
  updateStaff
);
staffRouter.post(
  "/staff/:id/enable",
  allowIfAuthenticated,
  isStaff,
  isAdmin,
  enableStaff
);
staffRouter.post(
  "/staff/:id/disable",
  allowIfAuthenticated,
  isStaff,
  isAdmin,
  disableStaff
);
staffRouter.delete(
  "/staff/:id",
  allowIfAuthenticated,
  isStaff,
  isAdminOrProfileOwner,
  deleteStaff
);
staffRouter.post(
  "/staff/discover/search",
  allowIfAuthenticated,
  isStaff,
  searchStaff
);

// For sellers
staffRouter.get("/sellers", allowIfAuthenticated, isStaff, fetchSellers);
staffRouter.get(
  "/sellers/:id",
  allowIfAuthenticated,
  isStaff,
  fetchIndividualSeller
);
staffRouter.get(
  "/sellers/:id/produts",
  allowIfAuthenticated,
  isStaff,
  fetchSellerProducts
);
staffRouter.put(
  "/sellers/:id",
  allowIfAuthenticated,
  isStaff,
  body("name").isString().isLength(stringConfig),
  body("email").isEmail(),
  body("phone")
    .isString()
    .matches(/^\d{11}$/)
    .optional(),
  body("address").isString().isLength(stringConfig).optional(),
  sellerUpload.single("image"),
  updateSeller
);
staffRouter.post(
  "/sellers/:id/enable",
  allowIfAuthenticated,
  isStaff,
  enableSeller
);
staffRouter.post(
  "/sellers/:id/disable",
  allowIfAuthenticated,
  isSeller,
  disableSeller
);
staffRouter.delete("/sellers/:id", allowIfAuthenticated, isStaff, deleteSeller);
staffRouter.post(
  "/sellers/discover/search",
  allowIfAuthenticated,
  isStaff,
  searchSeller
);

// For orders
staffRouter.get("/orders", allowIfAuthenticated, isStaff, fetchAllOrders);
staffRouter.get(
  "/orders/:id",
  allowIfAuthenticated,
  isStaff,
  fetchIndividualOrder
);
staffRouter.get(
  "/orders/:id/items",
  allowIfAuthenticated,
  isStaff,
  fetchIndividualOrderItems
);
staffRouter.put(
  "/orders/:id",
  allowIfAuthenticated,
  isStaff,
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
  updateOrderStatus
);
staffRouter.delete("/orders/:id", allowIfAuthenticated, isStaff, deleteOrder);
staffRouter.get(
  "/orders/discover/search",
  allowIfAuthenticated,
  isStaff,
  searchOrder
);

// Order items
staffRouter.get("/orderitems", allowIfAuthenticated, isStaff, fetchOrderItems);
staffRouter.get(
  "/orderitems/:id",
  allowIfAuthenticated,
  isStaff,
  fetchIndividualOrderItem
);
staffRouter.put(
  "/orderitems/:id",
  allowIfAuthenticated,
  isStaff,
  makeOrderItemReady
);
staffRouter.delete(
  "/orderitems/:id",
  allowIfAuthenticated,
  isStaff,
  deleteOrderItem
);
staffRouter.get(
  "/orderitems/discover/search",
  allowIfAuthenticated,
  isStaff,
  searchOrderItem
);

// cart
staffRouter.put("/cart/:id", allowIfAuthenticated, isStaff, orderCart);
staffRouter.delete("/cart/:id", allowIfAuthenticated, isStaff, emptyCart);

// cart items
staffRouter.get("/cartitems/:id", allowIfAuthenticated, isStaff, fetchCartItem);
staffRouter.put(
  "/cartitems/:id",
  allowIfAuthenticated,
  isStaff,
  updateCartItem
);
staffRouter.delete(
  "/cartitems/:id",
  allowIfAuthenticated,
  isStaff,
  deleteOrderItem
);

// wishlist
staffRouter.delete(
  "/wishlist/:id",
  allowIfAuthenticated,
  isStaff,
  emptyWishlist
);

// wishlist items
staffRouter.get(
  "/wishlistitems",
  allowIfAuthenticated,
  isStaff,
  fetchWishlistItems
);
staffRouter.get(
  "/wishlistitems/:id",
  allowIfAuthenticated,
  isStaff,
  fetchWishlistItem
);
staffRouter.delete(
  "/wishlistitems/:id",
  allowIfAuthenticated,
  isStaff,
  deleteWishlistItem
);

// Comments
staffRouter.get("/comments", allowIfAuthenticated, isStaff, fetchComments);
staffRouter.get(
  "/comments/:id",
  allowIfAuthenticated,
  isStaff,
  fetchIndividualComment
);
staffRouter.put(
  "/comments/:id",
  allowIfAuthenticated,
  isStaff,
  body("message").isString().isLength(stringConfig),
  updateComment
);
staffRouter.delete(
  "/comments/:id",
  allowIfAuthenticated,
  isStaff,
  deleteComment
);

export default staffRouter;
