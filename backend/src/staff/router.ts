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
import { login } from "./handlers/auth";
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
  makeOrderReady,
  updateOrderStatus,
} from "./handlers/orders";

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
/**
 * Finish them later
 * Work on other endpoints
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
  "/products/search",
  allowIfAuthenticated,
  isStaff,
  body("query").isString().isLength(stringConfig),
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
staffRouter.post(
  "/customers/search",
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
  "/staff/:id/search",
  allowIfAuthenticated,
  isStaff,
  body("query").isString().isLength(stringConfig),
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
  "/sellers/search",
  allowIfAuthenticated,
  isStaff,
  body("query").isString().isLength(stringConfig),
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
staffRouter.put(
  "/orders/:id/approve",
  allowIfAuthenticated,
  isStaff,
  makeOrderReady
);

export default staffRouter;
