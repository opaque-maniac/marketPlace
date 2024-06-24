import { create } from "zustand";

const $LOCAL_LOGGEDIN_KEY = "hazina_seller_logged_in";

interface LoggedInStoreState {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
}

const getInitialLoggedIn = () => {
  const user = localStorage.getItem($LOCAL_LOGGEDIN_KEY) || null;
  return user;
};

export const useLoggedInStore = create<LoggedInStoreState>((set) => ({
  user: getInitialLoggedIn(),
  login: (user) => {
    localStorage.setItem($LOCAL_LOGGEDIN_KEY, user);
    set({ user });
  },
  logout: () => {
    localStorage.removeItem($LOCAL_LOGGEDIN_KEY);
    set({ user: null });
  },
}));
