"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { PageLoader } from "@/components/common/page-loader";
import { useAuthStore } from "@/store/auth-store";

export function ProtectedRoute({ children, allowedRoles = [] }) {
  const router = useRouter();
  const { isAuthenticated, isHydrated, user } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(user?.roleId)
    ) {
      router.replace("/");
    }
  }, [isAuthenticated, isHydrated, router, allowedRoles, user?.roleId]);

  if (!isHydrated) {
    return (
      <PageLoader
        title="Checking access..."
        description="Please wait while we verify your account."
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <PageLoader
        title="Redirecting..."
        description="You need to sign in before accessing this page."
      />
    );
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.roleId)) {
    return (
      <PageLoader
        title="Redirecting..."
        description="You do not have permission to access this page."
      />
    );
  }

  return children;
}