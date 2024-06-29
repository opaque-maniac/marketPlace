import { create } from "zustand";

const $LOCAL_LOGGEDIN_KEY = "hazina_logged_in";
const $LOCAL_CART_KEY = "hazina_cart";
const $LOCAL_FAVORITES_KEY = "hazina_favorites";

interface LoggedInStoreState {
  user: string | null;
  cart: string | null;
  favorites: string | null;
  login: (user: string, cart: string, favorites: string) => void;
  decrementCart: () => void;
  incrementCart: () => void;
  incrimentFavorites: () => void;
  decrementFavorites: () => void;
  logout: () => void;
}

const getInitialLoggedIn = () => {
  const user = localStorage.getItem($LOCAL_LOGGEDIN_KEY) || null;
  return user;
};

const getInitialCart = () => {
  const cart = localStorage.getItem($LOCAL_CART_KEY) || null;
  return cart;
};

const getInitialFavorites = () => {
  const favorites = localStorage.getItem($LOCAL_FAVORITES_KEY) || null;
  return favorites;
};

export const useLoggedInStore = create<LoggedInStoreState>((set) => ({
  user: getInitialLoggedIn(),
  cart: getInitialCart(),
  favorites: getInitialFavorites(),
  login: (user, cart, favorites) => {
    localStorage.setItem($LOCAL_LOGGEDIN_KEY, user);
    localStorage.setItem($LOCAL_CART_KEY, cart);
    localStorage.setItem($LOCAL_FAVORITES_KEY, favorites);
    set({ user, cart, favorites });
  },
  incrementCart: () => {
    const cart = localStorage.getItem($LOCAL_CART_KEY) || null;
    if (cart) {
      localStorage.setItem($LOCAL_CART_KEY, String(Number(cart) + 1));
      set({ cart: String(Number(cart) + 1) });
    }
  },
  decrementCart: () => {
    const cart = localStorage.getItem($LOCAL_CART_KEY) || null;
    if (cart) {
      localStorage.setItem($LOCAL_CART_KEY, String(Number(cart) - 1));
      set({ cart: String(Number(cart) - 1) });
    }
  },
  incrimentFavorites: () => {
    const favorites = localStorage.getItem($LOCAL_FAVORITES_KEY) || null;
    if (favorites) {
      localStorage.setItem($LOCAL_CART_KEY, String(Number(favorites) + 1));
      set({ cart: String(Number(favorites) + 1) });
    }
  },
  decrementFavorites: () => {
    const favorites = localStorage.getItem($LOCAL_FAVORITES_KEY) || null;
    if (favorites) {
      localStorage.setItem($LOCAL_CART_KEY, String(Number(favorites) - 1));
      set({ cart: String(Number(favorites) - 1) });
    }
  },
  logout: () => {
    localStorage.removeItem($LOCAL_LOGGEDIN_KEY);
    set({ user: null, cart: null, favorites: null });
  },
}));
