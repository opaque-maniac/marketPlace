import { Router } from "express";
import { body } from "express-validator";
import {
  allowIfAuthenticated,
  isSeller,
} from "../../middleware/auth-middleware";
import {
  fetchIndividualOrder,
  fetchOrders,
  searchOrder,
  updateOrder,
} from "../handlers/orders";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isSeller);

// For order management
router.get("/", fetchOrders);
router.get("/:id", fetchIndividualOrder);
router.put(
  "/:id",
  body("status")
    .isString()
    .isIn([
      "PENDING",
      "PROCESSING",
      "SHIPPED",
      "READY",
      "DELIVERED",
      "CANCELLED",
    ]),
  updateOrder,
);
router.post("/search", searchOrder);

export default router;
