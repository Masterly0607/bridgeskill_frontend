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
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

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
      let parsedStoredUser = null;

      if (storedUser) {
        try {
          parsedStoredUser = JSON.parse(storedUser);
        } catch {
          parsedStoredUser = null;
        }
      }

      const response = await api.get("/api/auth/me");
      const me = response.data;

      const user = {
        id: me?.id ?? parsedStoredUser?.id ?? null,
        fullName: me?.fullName ?? parsedStoredUser?.fullName ?? "",
        email: me?.email ?? parsedStoredUser?.email ?? "",
        roleId: me?.roleId ?? parsedStoredUser?.roleId ?? null,
      };

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