"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth-store";
import { hasRequiredRole } from "@/lib/role";
import { getDashboardRouteByRole } from "@/lib/auth-redirect";

export function ProtectedRoute({ children, allowedRoles = [] }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (allowedRoles.length > 0 && !hasRequiredRole(user.roleId, allowedRoles)) {
      router.replace(getDashboardRouteByRole(user.roleId));
    }
  }, [isAuthenticated, user, allowedRoles, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  if (allowedRoles.length > 0 && !hasRequiredRole(user.roleId, allowedRoles)) {
    return null;
  }

  return children;
}

// What it does:

// if user not logged in → go to /login
// if role is wrong → send user to correct dashboard
// if access is correct → render page