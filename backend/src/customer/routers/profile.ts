import { Router } from "express";
import { body } from "express-validator";
import { stringConfig, createStorage } from "../../utils/globals";
import {
  allowIfAuthenticated,
  isCustomer,
  isProfileOwner,
} from "../../middleware/auth-middleware";
import multer from "multer";
import {
  deleteProfile,
  fetchProfile,
  updateProfile,
} from "../handlers/profile";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isCustomer);
router.use(isProfileOwner);

// File upload
const customerStorage = createStorage("uploads/customers");

const upload = multer({ storage: customerStorage });

// For profile managemnt
router.get("/:id", fetchProfile);
router.put(
  "/:id",
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  body("phone")
    .isString()
    .matches(/^[0-9]{10}$/)
    .optional(),
  body("address").isString().isLength(stringConfig).optional(),
  upload.single("image"),
  updateProfile,
);
router.delete("/:id", deleteProfile);

export default router;
