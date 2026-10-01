import { Router } from "express";
import {
  allowIfAuthenticated,
  allowIfIsCustomer,
} from "../middleware/auth-middleware";
import { CustomerEmptyWishlist, CustomerFetchWishlist } from "../controllers/wishlist/wishlist";
import { CustomerDeleteWishlistItem } from "../controllers/wishlist/wishlist-item";

const wishlistRouter = Router();

wishlistRouter.use(allowIfAuthenticated);
wishlistRouter.use(allowIfIsCustomer);

wishlistRouter.get("", CustomerFetchWishlist);
wishlistRouter.delete("", CustomerEmptyWishlist);

// Wishlist items
wishlistRouter.delete("/:id", CustomerDeleteWishlistItem);

export default wishlistRouter;
