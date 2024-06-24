import { Router } from "express";
import { body } from "express-validator";
import multer from "multer";
import {
  allowIfAuthenticated,
  isAdmin,
  isStaff,
} from "../middleware/authMiddleware";
import { checkForFiles } from "../middleware/dataMiddleware";
import {
  deleteCustomerProfile,
  deleteProduct,
  deleteSeller,
  deleteStaffProfile,
  fetchCustomers,
  fetchIndividualCustomer,
  fetchIndividualProduct,
  fetchIndividualSeller,
  fetchProducts,
  fetchSellerProducts,
  fetchSellers,
  loginStaff,
  registerStaff,
  retrieveIndividualStaffProfile,
  retrieveStaffProfiles,
  searchCustomer,
  searchProduct,
  searchSeller,
  searchStaff,
  updateCustomerProfile,
  updateIndividualStaffProfile,
  updateSeller,
} from "./handler";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "staffImages/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const staffRouter = Router();

let roleValues = ["ADMIN", "SALES", "MODERATOR"];

// For profile and staff management
staffRouter.post(
  "/login",
  body("email").isEmail(),
  body("staffId").isNumeric(),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
  loginStaff,
);
staffRouter.post(
  "/register",
  allowIfAuthenticated,
  isAdmin,
  body("email").isEmail(),
  body("firstName")
    .isString()
    .isLength({ min: 2 })
    .withMessage("First name should be at least 3 characters long"),
  body("lastName")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Last name should be at least 3 characters long"),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
  body("role")
    .optional()
    .isString()
    .isIn(roleValues)
    .withMessage("Role should be either ADMIN, SALES or MODERATOR"),
  checkForFiles,
  upload.single("image"),
  registerStaff,
);

// Profile management
staffRouter.get(
  "/profile",
  allowIfAuthenticated,
  isStaff,
  retrieveStaffProfiles,
);
staffRouter.get(
  "/profile/:id",
  allowIfAuthenticated,
  isStaff,
  retrieveIndividualStaffProfile,
);
staffRouter.put(
  "/profile/:id",
  allowIfAuthenticated,
  isAdmin,
  body("email").isEmail(),
  body("firstName")
    .isString()
    .isLength({ min: 2 })
    .withMessage("First name should be at least 3 characters long"),
  body("lastName")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Last name should be at least 3 characters long"),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
  body("role")
    .optional()
    .isString()
    .isIn(roleValues)
    .withMessage("Role should be either ADMIN, SALES or MODERATOR"),
  body("active").isBoolean().withMessage("Active should be a boolean"),
  checkForFiles,
  upload.single("image"),
  updateIndividualStaffProfile,
);
staffRouter.delete(
  "/profile/:id",
  allowIfAuthenticated,
  isAdmin,
  deleteStaffProfile,
);
staffRouter.post(
  "/profile/search",
  allowIfAuthenticated,
  isStaff,
  body("query")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Query should be at least 1 character long"),
  searchStaff,
);

// For user management
staffRouter.get("/customers", allowIfAuthenticated, isStaff, fetchCustomers);
staffRouter.get(
  "/customers/:id",
  allowIfAuthenticated,
  isStaff,
  fetchIndividualCustomer,
);
staffRouter.put(
  "/customer/:id",
  allowIfAuthenticated,
  isStaff,
  body("active").isBoolean().withMessage("Invalid active value"),
  updateCustomerProfile,
);
staffRouter.delete(
  "/customer/:id",
  allowIfAuthenticated,
  isStaff,
  deleteCustomerProfile,
);
staffRouter.post(
  "/customer/search",
  allowIfAuthenticated,
  isStaff,
  body("query")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Query should be at least 1 character long"),
  searchCustomer,
);

// For product management
staffRouter.get("/products", allowIfAuthenticated, isStaff, fetchProducts);
staffRouter.get(
  "/products/:id",
  allowIfAuthenticated,
  isStaff,
  fetchIndividualProduct,
);
staffRouter.delete(
  "/products/:id",
  allowIfAuthenticated,
  isStaff,
  deleteProduct,
);
staffRouter.post(
  "/products/search",
  allowIfAuthenticated,
  isStaff,
  body("query")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Query should be at least 1 character long"),
  searchProduct,
);

// For seller management
staffRouter.get("/sellers", allowIfAuthenticated, isStaff, fetchSellers);
staffRouter.get(
  "/sellers/:id",
  allowIfAuthenticated,
  isStaff,
  fetchIndividualSeller,
);
staffRouter.get(
  "/sellers/:id",
  allowIfAuthenticated,
  isStaff,
  fetchSellerProducts,
);
staffRouter.put(
  "/sellers/:id",
  allowIfAuthenticated,
  isStaff,
  body("active").isBoolean().withMessage("Invalid active value"),
  updateSeller,
);
staffRouter.delete("/sellers/:id", allowIfAuthenticated, isStaff, deleteSeller);
staffRouter.post(
  "/sellers/search",
  allowIfAuthenticated,
  isStaff,
  body("query")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Query should be at least 1 character long"),
  searchSeller,
);

export default staffRouter;
