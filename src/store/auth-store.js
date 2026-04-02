"use client";

import { create } from "zustand";
import { STORAGE_KEYS } from "@/lib/constants";
import api from "@/lib/axios";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isHydrated: false,

  setAuth: ({ token, user }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }

    set({
      token,
      user,
      isAuthenticated: true,
      isHydrated: true,
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
      isHydrated: true,
    });
  },

  hydrateAuth: async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (!token) {
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isHydrated: true,
      });
      return;
    }

    try {
      const response = await api.get("/api/auth/me");

      const user = response.data;

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

      set({
        token,
        user,
        isAuthenticated: true,
        isHydrated: true,
      });
    } catch (error) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);

      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isHydrated: true,
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