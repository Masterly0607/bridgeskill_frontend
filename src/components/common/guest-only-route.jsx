"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { PageLoader } from "@/components/common/page-loader";
import { ROLES } from "@/lib/role";
import { useAuthStore } from "@/store/auth-store";

function getRedirectPath(roleId) {
  if (roleId === ROLES.ADMIN) return "/admin/dashboard";
  if (roleId === ROLES.CLIENT) return "/client/dashboard";
  return "/student/dashboard";
}

export function GuestOnlyRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, isHydrated, user } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;

    if (isAuthenticated) {
      router.replace(getRedirectPath(user?.roleId));
    }
  }, [isAuthenticated, isHydrated, router, user?.roleId]);

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto max-w-6xl">
          <PageLoader />
        </div>
      </main>
    );
  }

  if (isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto max-w-6xl">
          <PageLoader />
        </div>
      </main>
    );
  }

  return children;
}