import { Router } from "express";
import { body } from "express-validator";
import { stringConfig, createStorage } from "../../utils/globals";
import {
  allowIfAuthenticated,
  isSeller,
} from "../../middleware/auth-middleware";
import { deleteProfile, fetchProfile, updateProfie } from "../handlers/profile";
import multer from "multer";

const router = Router();

// File upload
const sellerStorage = createStorage("uploads/sellers");
const sellerUpload = multer({ storage: sellerStorage });

// Profile management
router.get("/", allowIfAuthenticated, isSeller, fetchProfile);
router.put(
  "/",
  allowIfAuthenticated,
  isSeller,
  body("name").isString().isLength(stringConfig),
  body("email").isEmail(),
  body("phone")
    .isString()
    .matches(/^[0-9]{10}$/)
    .optional(),
  body("address").isString().isLength(stringConfig).optional(),
  body("bio").optional().isString().isLength({ min: 10, max: 500 }),
  sellerUpload.single("image"),
  updateProfie,
);
router.delete("/", allowIfAuthenticated, isSeller, deleteProfile);

export default router;
