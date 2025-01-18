import { Router } from "express";
import { body } from "express-validator";
import { stringConfig, createStorage } from "../../utils/globals";
import {
  allowIfAuthenticated,
  isProfileOwner,
  isSeller,
} from "../../middleware/auth-middleware";
import { deleteProfile, fetchProfile, updateProfie } from "../handlers/profile";
import multer from "multer";

const router = Router();

// File upload
const sellerStorage = createStorage("uploads/sellers");
const sellerUpload = multer({ storage: sellerStorage });

// Profile management
router.get(
  "/:id",
  allowIfAuthenticated,
  isSeller,
  isProfileOwner,
  fetchProfile,
);
router.put(
  "/:id",
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
router.delete(
  "/:id",
  allowIfAuthenticated,
  isSeller,
  isProfileOwner,
  deleteProfile,
);

export default router;
