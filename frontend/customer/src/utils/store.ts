import { create } from "zustand";

interface UserStore {
  user: string | null;
  setUser: (newUser: string | null) => void;
  removeUser: () => void;
}

const USER_KEY = "hazina-customer";
const CART_KEY = "hazina-cart";
const WISHLIST_KEY = "hazina-wishlist";

const useUserStore = create<UserStore>((set) => {
  let initialUser: string | null = null;
  let initialCart: number | null = null;
  let initialWishlist: number | null = null;

  if (typeof window !== "undefined") {
    // Ensure this runs only in the browser
    const user = window.localStorage.getItem(USER_KEY);
    const cart = window.localStorage.getItem(CART_KEY);
    const wishlist = window.localStorage.getItem(WISHLIST_KEY);
    if (user) {
      initialUser = user;
    }
    if (cart) {
      initialCart = parseInt(cart);
    }
    if (wishlist) {
      initialWishlist = parseInt(wishlist);
    }
  }

  return {
    user: initialUser,
    cart: initialCart,
    wishlit: initialWishlist,
    setUser: (newUser: string | null) => {
      if (newUser !== null) {
        window.localStorage.setItem(USER_KEY, newUser);
      } else {
        window.localStorage.removeItem(USER_KEY);
      }
      set({ user: newUser });
    },
    removeUser: () => {
      window.localStorage.removeItem(USER_KEY);
      set({ user: null });
    },
  };
});

export default useUserStore;
