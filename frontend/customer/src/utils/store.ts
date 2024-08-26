import { create } from "zustand";

interface UserStore {
  user: string | null;
  cart: number | null;
  wishlit: number | null;
  setUser: (newUser: string | null) => void;
  setCart: (cart: number) => void;
  setWishlist: (wishlist: number) => void;
  removeUser: () => void;
  removeCart: () => void;
  removeWishlist: () => void;
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
    setCart: (cart: number) => {
      window.localStorage.setItem(CART_KEY, cart.toString());
      set({ cart });
    },
    setWishlist: (wishlist: number) => {
      window.localStorage.setItem(WISHLIST_KEY, wishlist.toString());
      set({ wishlit: wishlist });
    },
    removeUser: () => {
      window.localStorage.removeItem(USER_KEY);
      set({ user: null });
    },
    removeCart: () => {
      window.localStorage.removeItem(CART_KEY);
      set({ cart: null });
    },
    removeWishlist: () => {
      window.localStorage.removeItem(WISHLIST_KEY);
      set({ wishlit: null });
    },
  };
});

export default useUserStore;
