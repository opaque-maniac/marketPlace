import { Router } from "express";
import { body } from "express-validator";
import { stringConfig, createStorage } from "../../utils/globals";
import {
  allowIfAuthenticated,
  isStaff,
} from "../../middleware/auth-middleware";
import multer from "multer";
import {
  deleteSeller,
  disableSeller,
  enableSeller,
  fetchIndividualSeller,
  fetchSellerOrders,
  fetchSellerProducts,
  fetchSellers,
  updateSeller,
} from "../handlers/sellers";
import { fetchSellerMisconducts } from "../handlers/misconducts";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

const sellerStorage = createStorage("uploads/sellers");
const sellerUpload = multer({ storage: sellerStorage });

// fetch sellers
router.get("/", fetchSellers);

// fetch individual seller
router.get("/:id", fetchIndividualSeller);

// fetch seller products
router.get("/:id/products", fetchSellerProducts);

// fetch seller orders
router.get("/:id/orders", fetchSellerOrders);

// update seller
router.put(
  "/:id",
  body("name").isString().isLength(stringConfig),
  body("email").isEmail(),
  body("phone")
    .isString()
    .matches(/^\d{11}$/)
    .optional(),
  body("address").isString().isLength(stringConfig).optional(),
  sellerUpload.single("image"),
  updateSeller,
);

// disable and enable seller
router.post("/:id/enable", enableSeller);
router.post("/:id/disable", disableSeller);
router.get("/:id/misconducts", fetchSellerMisconducts);

// delete seller
router.delete("/:id", deleteSeller);

export default router;
