import { create } from "zustand";
import {
  getStaffRole,
  getUserID,
  removeStaffRole,
  removeUserID,
  setStaffRole,
  setUserID,
} from "./cookies";
import { ROLE } from "./types";

interface UserStore {
  user: string | null;
  role: ROLE | null;
  setUser: (newUser: string) => void;
  setRole: (newRole: ROLE) => void;
  removeUser: () => void;
  removeRole: () => void;
}

const useUserStore = create<UserStore>((set) => {
  let initialUser: string | null = null;
  let initialRole: ROLE | null = null;

  if (typeof window !== "undefined") {
    // Ensure this runs only in the browser
    const user = getUserID();
    const role = getStaffRole();

    if (user) {
      initialUser = user;
    }

    if (role) {
      initialRole = role;
    }
  }

  return {
    user: initialUser,
    role: initialRole,
    setUser(newUser: string) {
      set({ user: newUser, role: getStaffRole() || null });
    },
    setRole(newRole) {
      if (newRole) {
        set({ user: getUserID() || null, role: getStaffRole() || null });
      }
    },
    removeUser() {
      this.removeRole();
      set({ user: null, role: null });
    },
    removeRole() {
      set({ user: getUserID() || null, role: getStaffRole() || null });
    },
  };
});

export default useUserStore;
