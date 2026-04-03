"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness } from "lucide-react";

import { useAuthStore } from "@/store/auth-store";
import { ROLES } from "@/lib/role";
import { LogoutButton } from "@/components/common/logout-button";

function getDashboardHref(roleId) {
  if (roleId === ROLES.ADMIN) return "/admin/dashboard";
  if (roleId === ROLES.CLIENT) return "/client/dashboard";
  return "/student/dashboard";
}

function NavLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
        active
          ? "bg-slate-100 text-slate-900"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { isAuthenticated, isHydrated, user } = useAuthStore();

  const dashboardHref = getDashboardHref(user?.roleId);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-bold text-slate-900">BridgeSkill</p>
            <p className="text-xs text-slate-500">
              Flexible jobs for students
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink href="/" label="Home" active={pathname === "/"} />
          <NavLink
            href="/jobs"
            label="Jobs"
            active={pathname.startsWith("/jobs")}
          />

          {isHydrated && isAuthenticated && (
            <NavLink
              href={dashboardHref}
              label="Dashboard"
              active={pathname.includes("/dashboard")}
            />
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!isHydrated ? (
            <div className="hidden md:block text-sm text-slate-500">
              Loading...
            </div>
          ) : isAuthenticated ? (
            <>
              {!isAuthPage && (
                <Link
                  href={dashboardHref}
                  className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 md:inline-flex"
                >
                  Dashboard
                </Link>
              )}

              <LogoutButton className="rounded-xl" />
            </>
          ) : (
            <>
              {!isAuthPage && (
                <>
                  <Link
                    href="/login"
                    className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 md:inline-flex"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    Register
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}