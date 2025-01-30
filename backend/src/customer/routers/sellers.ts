import { Router } from "express";
import { fetchSellerProducts, fetchSellerProfile } from "../handlers/sellers";

const router = Router();

//  fetch seller
router.get("/:id", fetchSellerProfile);

// fetch seller products
router.get("/:id/products", fetchSellerProducts);

export default router;
