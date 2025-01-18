import { Router } from "express";
import { body } from "express-validator";
import {
  allowIfAuthenticated,
  isStaff,
} from "../../middleware/auth-middleware";
import {
  deleteOrder,
  fetchAllOrders,
  fetchIndividualOrder,
  updateOrderStatus,
} from "../handlers/orders";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

// fetch orders
router.get("/", fetchAllOrders);

// fetch individual order
router.get("/:id", fetchIndividualOrder);

// update order status
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
  updateOrderStatus,
);

// delete order
router.delete("/:id", deleteOrder);

export default router;
