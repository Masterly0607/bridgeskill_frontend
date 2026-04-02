import { create } from "zustand";
import { STORAGE_KEYS } from "@/lib/constants";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  setAuth: ({ token, user }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }

    set({
      token,
      user,
      isAuthenticated: true,
    });
  },

  clearAuth: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    }

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  hydrateAuth: () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const user = localStorage.getItem(STORAGE_KEYS.USER);

    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
      });
    }
  },
}));

// 3. What this store means

// This store keeps 3 important values:

// token → JWT from backend
// user → logged-in user info
// isAuthenticated → true/false for route logic

// And 3 actions:

// setAuth() → save login data
// clearAuth() → logout
// hydrateAuth() → restore auth from browser storage on refresh