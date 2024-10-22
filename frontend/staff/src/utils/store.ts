import { create } from "zustand";

interface UserStore {
  user: string | null;
  setUser: (newUser: string | null) => void;
  removeUser: () => void;
}

const USER_KEY = "hazina-staff";

const useUserStore = create<UserStore>((set) => {
  let initialUser: string | null = null;

  if (typeof window !== "undefined") {
    // Ensure this runs only in the browser
    const user = window.localStorage.getItem(USER_KEY);

    if (user) {
      initialUser = user;
    }
  }

  return {
    user: initialUser,
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
