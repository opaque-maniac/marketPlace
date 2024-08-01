import { Router } from "express";
import { body } from "express-validator";
import multer from "multer";
import {
  allowIfAuthenticated,
  isProductSeller,
  isProfileOwner,
  isSeller,
} from "../middleware/authMiddleware";
import { checkForFiles } from "../middleware/dataMiddleware";
import {
  deleteSellerProfile,
  fetchSellerProfile,
  loginSeller,
  registerSeller,
  updateSellerProfile,
} from "./handlers/profile";
import { fetchSellerProducts } from "../staff/handler";
import {
  createSellerProduct,
  deleteIndividualSellerProduct,
  fetchIndividualSellerProduct,
  searchSellerProducts,
  updateIndividualSellerProduct,
} from "./handlers/products";
import {
  fetchIndividualSellerOrder,
  fetchSellerOrders,
  updateIndividualSellerOrder,
} from "./handlers/orders";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "productImages/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const sellerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "sellerImages/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const sellerUpload = multer({ storage: sellerStorage });

const sellerRouter = Router();

// Seller validation
sellerRouter.post(
  "/register",
  body("email").isEmail().withMessage("Invalid email"),
  body("storeName")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Store name should be at least 2 characters long"),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
  registerSeller
);
sellerRouter.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
  loginSeller
);

// For profile management
sellerRouter.get(
  "/profile/:id",
  allowIfAuthenticated,
  isSeller,
  isProfileOwner,
  fetchSellerProfile
);
sellerRouter.put(
  "/profile/:id",
  allowIfAuthenticated,
  isSeller,
  isProfileOwner,
  body("email").isEmail().withMessage("Invalid email"),
  body("storeName")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Store name should be at least 2 characters long"),
  body("firstName")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage("First name should be at least 2 characters long"),
  body("lastName")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage("Last name should be at least 2 characters long"),
  body("address")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage("Address should be at least 2 characters long"),
  body("phone")
    .optional()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Phone number should be at least 10 characters long"),
  body("city")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage("City should be at least 2 characters long"),
  body("country")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage("Country should be at least 2 characters long"),
  sellerUpload.single("image"),
  updateSellerProfile
);
sellerRouter.delete(
  "/profile/:id",
  allowIfAuthenticated,
  isSeller,
  isProfileOwner,
  deleteSellerProfile
);

// Product categories
let productCategories = [
  "ELECTRONICS",
  "BOOKS",
  "CLOTHING",
  "HOME_KITCHEN",
  "BEAUTY_HEALTH",
  "SPORTS_OUTDOORS",
  "TOYS_GAMES",
];

// For product management
sellerRouter.get(
  "/products",
  allowIfAuthenticated,
  isSeller,
  fetchSellerProducts
);
sellerRouter.post(
  "/products",
  allowIfAuthenticated,
  isSeller,
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Product name should be at least 2 characters long"),
  body("description")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Product description should be at least 2 characters long"),
  body("price").isNumeric().withMessage("Price should be a number"),
  body("stock").isInt().withMessage("Stock should be an integer"),
  body("category")
    .isString()
    .isIn(productCategories)
    .withMessage(
      "Category should be one of the following: ELECTRONICS, BOOKS, CLOTHING, HOME_KITCHEN, BEAUTY_HEALTH, SPORTS_OUTDOORS, TOYS_GAMES"
    ),
  upload.array("image", 5),
  createSellerProduct
);
sellerRouter.get(
  "/products/:id",
  allowIfAuthenticated,
  isSeller,
  isProductSeller,
  fetchIndividualSellerProduct
);
sellerRouter.put(
  "/products/:id",
  allowIfAuthenticated,
  isSeller,
  isProductSeller,
  body("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Product name should be at least 2 characters long"),
  body("description")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Product description should be at least 2 characters long"),
  body("price").isNumeric().withMessage("Price should be a number"),
  body("stock").isInt().withMessage("Stock should be an integer"),
  body("category")
    .isString()
    .isIn(productCategories)
    .withMessage(
      "Category should be one of the following: ELECTRONICS, BOOKS, CLOTHING, HOME_KITCHEN, BEAUTY_HEALTH, SPORTS_OUTDOORS, TOYS_GAMES"
    ),
  checkForFiles,
  upload.array("image", 5),
  updateIndividualSellerProduct
);
sellerRouter.delete(
  "/products/:id",
  allowIfAuthenticated,
  isSeller,
  isProductSeller,
  deleteIndividualSellerProduct
);

// Product management
sellerRouter.get(
  "/products/search",
  allowIfAuthenticated,
  isSeller,
  searchSellerProducts
);

// For order management
sellerRouter.get("/orders", allowIfAuthenticated, isSeller, fetchSellerOrders);
sellerRouter.get(
  "/orders/:id",
  allowIfAuthenticated,
  isSeller,
  fetchIndividualSellerOrder
);
sellerRouter.put(
  "/orders/:id",
  allowIfAuthenticated,
  isSeller,
  updateIndividualSellerOrder
);

export default sellerRouter;
