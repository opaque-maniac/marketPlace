import { create } from "zustand";

interface UserStore {
  user: string | null;
  setUser: (newUser: string) => void;
  removeUser: () => void;
}

let INITIAL_USER: null | string = null;
const USER_KEY = "hazina-seller";

if (typeof window !== "undefined") {
  const user = window.localStorage.getItem(USER_KEY);
  if (user) {
    INITIAL_USER = user;
  }
}

const userStore = create<UserStore>((set) => ({
  user: INITIAL_USER,
  setUser: (newUser) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(USER_KEY, newUser);
    }
    set({ user: newUser });
  },
  removeUser: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(USER_KEY);
    }
    set({ user: null });
  },
}));

export default userStore;
