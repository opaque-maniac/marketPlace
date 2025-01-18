import { Router } from "express";
import {
  allowIfAuthenticated,
  isCustomer,
} from "../../middleware/auth-middleware";
import { fetchSellerProducts, fetchSellerProfile } from "../handlers/sellers";

const router = Router();

//  fetch seller
router.get("/:id", allowIfAuthenticated, isCustomer, fetchSellerProfile);

// fetch seller products
router.get(
  "/:id/products",
  allowIfAuthenticated,
  isCustomer,
  fetchSellerProducts,
);

export default router;
