"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export function AuthProvider({ children }) {
  const { hydrateAuth, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) {
      hydrateAuth();
    }
  }, [hydrateAuth, isHydrated]);

  return children;
}