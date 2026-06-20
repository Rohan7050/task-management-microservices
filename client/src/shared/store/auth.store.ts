import { create } from "zustand";
import { STORAGE_CONSTANTS } from "../constants/app.constants";
import { persist } from "zustand/middleware";

type UserType = {
  email: string;
  username: string;
  id: string;
} | null;

interface AuthState {
  user: UserType;
  setAuth: (user: UserType, isLogin: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setAuth: (user: UserType, isLogin: boolean) => {
        localStorage.setItem(STORAGE_CONSTANTS.isLogin, `${isLogin}`);
        set({ user });
      },
      logout: () => {
        localStorage.removeItem(STORAGE_CONSTANTS.isLogin);
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
