"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth-store";
import { getDashboardRouteByRole } from "@/lib/auth-redirect";

export function GuestRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace(getDashboardRouteByRole(user.roleId));
    }
  }, [isAuthenticated, user, router]);

  if (isAuthenticated && user) {
    return null;
  }

  return children;
}
// What it does:

// if already logged in, user should not stay on:
// /login
// /register

// Instead:

// admin → /admin/dashboard
// student → /student/dashboard
// client → /client/dashboard