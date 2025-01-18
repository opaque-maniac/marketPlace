import { Router } from "express";
import { body } from "express-validator";
import { stringConfig, createStorage } from "../../utils/globals";
import {
  allowIfAuthenticated,
  isProfileOwner,
  isStaff,
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
router.use(isProfileOwner);
router.use(isStaff);

// File upload
const staffStorage = createStorage("uploads/staff");
const staffUpload = multer({ storage: staffStorage });

// fetch profile
router.get("/:id", fetchProfile);

// update profile
router.put(
  "/:id",
  body("email").isEmail(),
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  staffUpload.single("image"),
  updateProfile,
);

// delete profile
router.delete("/:id", deleteProfile);

export default router;
