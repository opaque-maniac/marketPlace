import { Router } from "express";
import { StaffFetchProducts } from "../../controllers/products/staff/products";
import {
  allowIfAuthenticated,
  allowIfIsStaff,
} from "../../middleware/auth-middleware";
import {
  StaffDeleteProduct,
  StaffUpdateProduct,
  StaffUpdateProductVerifiedStatus,
} from "../../controllers/products/staff/individual-product";
import { createStorage } from "../../utils/storage";
import multer from "multer";
import { floatRegex, stringConfig } from "../../utils/input-validation";
import { body } from "express-validator";

const staffRouter = Router();

// Media upload
const productStorage = createStorage("product");
const productUpload = multer({ storage: productStorage });

staffRouter.use(allowIfAuthenticated);
staffRouter.use(allowIfIsStaff);

staffRouter.get("", StaffFetchProducts);

// Individual products
staffRouter.get("/:id", StaffFetchProducts);
staffRouter.put(
  "/:id",
  body("name").isString().isLength(stringConfig),
  body("description").isString().isLength({ min: 10, max: 255 }),
  body("buyingPrice").isString().matches(floatRegex),
  body("sellingPrice").isString().matches(floatRegex),
  body("inventory").isNumeric(),
  body("categoryId").isString(),
  productUpload.array("images", 5),
  StaffUpdateProduct,
);
staffRouter.patch("/:id", StaffUpdateProductVerifiedStatus);
staffRouter.delete("/:id", StaffDeleteProduct);

export default staffRouter;
