import { Router } from "express";
import {
  allowIfAuthenticated,
  allowIfIsSeller,
} from "../../middleware/auth-middleware";
import {
  SellerCreateNewProduct,
  SellerFetchProducts,
} from "../../controllers/products/sellers/products";
import {
  SellerDeleteIndividualProduct,
  SellerFetchIndividualProduct,
  SellerUpdateIndividualProduct,
  SellerUpdateProductVerifiedStatus,
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

sellerRouter.get("", SellerFetchProducts);
sellerRouter.post(
  "",
  body("name").isString().isLength(stringConfig),
  body("description").isString().isLength({ min: 10, max: 255 }),
  body("buyingPrice").isString().matches(floatRegex),
  body("sellingPrice").isString().matches(floatRegex),
  body("inventory").isNumeric(),
  body("categoryId").isString(),
  productUpload.array("images", 5),
  SellerCreateNewProduct,
);

// Invidiual product
sellerRouter.get("/:id", SellerFetchIndividualProduct);
sellerRouter.put(
  "/:id",
  body("name").isString().isLength(stringConfig),
  body("description").isString().isLength({ min: 10, max: 255 }),
  body("buyingPrice").isString().matches(floatRegex),
  body("sellingPrice").isString().matches(floatRegex),
  body("inventory").isNumeric(),
  body("categoryId").isString(),
  productUpload.array("images", 5),
  SellerUpdateIndividualProduct,
);
sellerRouter.patch(
  "/:id",
  body("verified").isBoolean(),
  SellerUpdateProductVerifiedStatus,
);
sellerRouter.delete("/:id", SellerDeleteIndividualProduct);

export default sellerRouter;
