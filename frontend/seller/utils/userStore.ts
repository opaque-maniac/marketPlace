import { create } from "zustand";
import isClient from "./isClient";

interface UserStore {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
  getUser: () => string | null;
}

const USER_KEY = "hazina-seller";
const USER_INITIAL_STATE = isClient()
  ? window.localStorage.getItem(USER_KEY)
  : null;

const userStore = create<UserStore>((set, get) => ({
  user: USER_INITIAL_STATE,
  login: (user) => {
    set({ user });
    window.localStorage.setItem(USER_KEY, user);
  },
  logout: () => {
    set({ user: null });
    window.localStorage.removeItem(USER_KEY);
  },
  getUser: () => get().user,
}));

export default userStore;
