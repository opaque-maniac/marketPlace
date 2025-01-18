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
router.get("/orders", fetchOrders);

// fetch individual order
router.get("/orders/:id", fetchIndividualOrder);

// cancel order
router.delete("/orders/:id/cancel", cancelOrder);

export default router;
