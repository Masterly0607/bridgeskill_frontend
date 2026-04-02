"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth-store";
import { getDashboardRouteByRole } from "@/lib/auth-redirect";
import { PageLoader } from "@/components/common/page-loader";

export function GuestRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, user, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;

    if (isAuthenticated && user) {
      router.replace(getDashboardRouteByRole(user.roleId));
    }
  }, [isHydrated, isAuthenticated, user, router]);

  if (!isHydrated) {
    return <PageLoader />;
  }

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