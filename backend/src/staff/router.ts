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
  isProfileOwner,
} from "../middleware/auth-middleware";
import multer from "multer";

const staffRouter = Router();

// File upload
const customerStorage = createStorage("uploads/staff");

const upload = multer({ storage: customerStorage });

export default staffRouter;
