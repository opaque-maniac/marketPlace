import { Router } from "express";
import {
  allowIfAuthenticated,
  isCustomer,
} from "../../middleware/auth-middleware";
import {
  addToWishlist,
  emptyWishlist,
  fetchWishlist,
  fetchWishlistCount,
  fetchWishlistItem,
  removeFromWishlist,
} from "../handlers/wishlist";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isCustomer);

// fetch wishlist
router.get("/", fetchWishlist);

// empty wishlist
router.delete("/", emptyWishlist);

// add to wishlist
router.post("/:id", addToWishlist);

// fetch wishlist item
router.get("/:id", fetchWishlistItem);

// remove from wishlist
router.delete("/:id", removeFromWishlist);

// fetch wishlist count
router.get("/wishlistcount", fetchWishlistCount);

export default router;
