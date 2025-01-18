import { Router } from "express";
import { body } from "express-validator";
import { stringConfig, createStorage } from "../../utils/globals";
import {
  allowIfAuthenticated,
  isAdmin,
  isAdminOrProfileOwner,
  isStaff,
} from "../../middleware/auth-middleware";
import multer from "multer";
import {
  deleteStaff,
  disableStaff,
  enableStaff,
  fetchIndividualStaff,
  fetchStaff,
  updateStaff,
} from "../handlers/staff";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

// File upload
const staffStorage = createStorage("uploads/staff");
const staffUpload = multer({ storage: staffStorage });

// fetch staff
router.get("/", fetchStaff);

// fetch individual staff
router.get("/:id", fetchIndividualStaff);

// update staff
router.put(
  "/:id",
  isAdminOrProfileOwner,
  body("firstName").isString().isLength(stringConfig),
  body("lastName").isString().isLength(stringConfig),
  body("email").isEmail(),
  staffUpload.single("image"),
  updateStaff,
);

// delete staff
router.post("/:id/enable", isAdmin, enableStaff);
router.post("/:id/disable", isAdmin, disableStaff);

// delete staff
router.delete("/:id", isAdminOrProfileOwner, deleteStaff);

export default router;
