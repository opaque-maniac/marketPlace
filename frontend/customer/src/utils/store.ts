import { create } from "zustand";
import { getUserID, removeUserID, setUserID } from "./cookies";

interface UserStore {
  user: string | null;
  setUser: (newUser: string | null) => void;
  removeUser: () => void;
}

const useUserStore = create<UserStore>((set) => {
  let initialUser: string | null = null;

  if (typeof window !== "undefined") {
    // Ensure this runs only in the browser
    const user = getUserID();
    if (user) {
      initialUser = user;
    }
  }

  return {
    user: initialUser,
    setUser: (newUser: string | null) => {
      if (newUser !== null) {
        setUserID(newUser);
      } else {
        removeUserID();
      }
      set({ user: newUser });
    },
    removeUser: () => {
      removeUserID();
      set({ user: null });
    },
  };
});

export default useUserStore;
