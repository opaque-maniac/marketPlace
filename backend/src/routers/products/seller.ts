import { Router } from "express";
import {
  allowIfAuthenticated,
  allowIfIsSeller,
} from "../../middleware/auth-middleware";
import {
  CreateNewProduct,
  FetchSellerProducts,
} from "../../controllers/products/sellers/products";
import {
  DeleteSellerIndividualProduct,
  FetchSellerIndividualProduct,
  UpdateSellerIndividualProduct,
  UpdateSellerProductVerifiedStatus,
} from "../../controllers/products/sellers/individual-product";
import { createStorage } from "../../utils/storage";
import multer from "multer";
import { body } from "express-validator";
import { floatRegex, stringConfig } from "../../utils/input-validation";

const sellerRouter = Router();

// File upload
const productStorage = createStorage("product");
const productUpload = multer({ storage: productStorage });

sellerRouter.use(allowIfAuthenticated);
sellerRouter.use(allowIfIsSeller);

sellerRouter.get("", FetchSellerProducts);
sellerRouter.post(
  "",
  body("name").isString().isLength(stringConfig),
  body("description").isString().isLength({ min: 10, max: 255 }),
  body("buyingPrice").isString().matches(floatRegex),
  body("sellingPrice").isString().matches(floatRegex),
  body("inventory").isNumeric(),
  body("categoryId").isString(),
  productUpload.array("images", 5),
  CreateNewProduct,
);

// Invidiual product
sellerRouter.get("/:id", FetchSellerIndividualProduct);
sellerRouter.put(
  "/:id",
  body("name").isString().isLength(stringConfig),
  body("description").isString().isLength({ min: 10, max: 255 }),
  body("buyingPrice").isString().matches(floatRegex),
  body("sellingPrice").isString().matches(floatRegex),
  body("inventory").isNumeric(),
  body("categoryId").isString(),
  productUpload.array("images", 5),
  UpdateSellerIndividualProduct,
);
sellerRouter.patch("/:id", UpdateSellerProductVerifiedStatus);
sellerRouter.delete("/:id", DeleteSellerIndividualProduct);

export default sellerRouter;
