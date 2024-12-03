import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type User = {
  email: string;
  userName: string;
  id: string;
};

type AppState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAppStore = create<AppState>()(
  devtools(
    persist<AppState>(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      { name: "userStore" }
    )
  )
);
