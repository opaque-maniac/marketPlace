import { Router } from "express";
import { body } from "express-validator";
import multer from "multer";
import {
  addToCart,
  createComplaint,
  deleteCustomerPofile,
  deleteOrder,
  deleteOrderItem,
  emptyCart,
  fetchCustomerCart,
  fetchCustomerProfile,
  fetchInvidualProduct,
  fetchOrders,
  fetchProducts,
  fetchSellerProducts,
  fetchSellerProfile,
  loginCustomer,
  orderCart,
  registerCustomer,
  removeFromCart,
  searchProduct,
  updateCartItem,
  updateCustomerProfile,
  updateOrderItem,
} from "./handler";
import {
  allowIfAuthenticated,
  isCustomer,
  isProfileOwner,
} from "../middleware/authMiddleware";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "customerImages/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const customerRouter = Router();

// Customer validation
customerRouter.post(
  "/register",
  body("email").isEmail().withMessage("Invalid email"),
  body("firstName")
    .isString()
    .isLength({ min: 2 })
    .withMessage("First name should be at least 2 characters long"),
  body("lastName")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Last name should at least be 2 characters long"),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
  registerCustomer,
);
customerRouter.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
  loginCustomer,
);

// Profile management
customerRouter.get(
  "profile/:id",
  allowIfAuthenticated,
  isCustomer,
  isProfileOwner,
  fetchCustomerProfile,
);
customerRouter.put(
  "profile/:id",
  allowIfAuthenticated,
  isCustomer,
  isProfileOwner,
  body("email").isEmail(),
  body("firstName")
    .isString()
    .isLength({ min: 2 })
    .withMessage("First name should be at least 2 characters long"),
  body("lastName")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Last name should be at least 2 characters long"),
  body("address").optional().isString().isLength({ min: 2 }),
  body("city").optional().isString().isLength({ min: 2 }),
  body("country").optional().isString().isLength({ min: 2 }),
  body("phone").optional().isString().isLength({ min: 10 }),
  upload.single("image"),
  updateCustomerProfile,
);
customerRouter.delete(
  "profile/:id",
  allowIfAuthenticated,
  isCustomer,
  isProfileOwner,
  deleteCustomerPofile,
);

// For seller
customerRouter.get("/seller/:id", fetchSellerProfile);
customerRouter.get("/seller/:id/products", fetchSellerProducts);

// cart management
customerRouter.get(
  "/cart",
  allowIfAuthenticated,
  isCustomer,
  fetchCustomerCart,
);
customerRouter.delete("/cart", allowIfAuthenticated, isCustomer, emptyCart);
customerRouter.post("/cart/:id", allowIfAuthenticated, isCustomer, addToCart);
customerRouter.put(
  "/cart/:id",
  allowIfAuthenticated,
  isCustomer,
  body("quantity").isInt(),
  updateCartItem,
);
customerRouter.delete(
  "/cart/:id",
  allowIfAuthenticated,
  isCustomer,
  removeFromCart,
);

// For product and store management
customerRouter.get("/products", fetchProducts);
customerRouter.get("/products/:id", fetchInvidualProduct);
customerRouter.post("/products/search", searchProduct);

// For order management
customerRouter.get("/orders", allowIfAuthenticated, isCustomer, fetchOrders);
customerRouter.post("/orders", allowIfAuthenticated, isCustomer, orderCart);
customerRouter.delete(
  "/orders/:id",
  allowIfAuthenticated,
  isCustomer,
  deleteOrder,
);
customerRouter.put(
  "/orders/:id/:itemId",
  allowIfAuthenticated,
  isCustomer,
  updateOrderItem,
);
customerRouter.delete(
  "/orders/:id/:itemId",
  allowIfAuthenticated,
  isCustomer,
  deleteOrderItem,
);

// For complaints
customerRouter.post(
  "/complaints",
  body("email").isEmail(),
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Name should be at least 2 characters long"),
  body("message")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Message should be at least 10 characters long"),
  body("phone")
    .optional()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Invalid phone number"),
  createComplaint,
);

export default customerRouter;
