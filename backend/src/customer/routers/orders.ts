import { Router } from "express";
import {
  allowIfAuthenticated,
  isCustomer,
} from "../../middleware/auth-middleware";
import {
  cancelOrder,
  fetchIndividualOrder,
  fetchOrders,
} from "../handlers/orders";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isCustomer);

// fetch orders
router.get("/", fetchOrders);

// fetch individual order
router.get("/:id", fetchIndividualOrder);

// cancel order
router.delete("/:id/cancel", cancelOrder);

export default router;
