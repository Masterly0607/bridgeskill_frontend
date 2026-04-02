"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export function AuthProvider({ children }) {
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  return children;
}
// Why:

// layout.js is a server component by default
// Zustand + localStorage needs client-side logic
// this wrapper restores auth once when app loads