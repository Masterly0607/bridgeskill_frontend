"use client";

import Link from "next/link";

import { ProtectedRoute } from "@/components/common/protected-route";
import { LogoutButton } from "@/components/common/logout-button";
import { ROLES } from "@/lib/role";
import { Button } from "@/components/ui/button";

export default function ClientDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Client Dashboard
          </h1>
          <p className="mt-3 text-slate-600">
            Manage your company profile and posted jobs.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-xl">
              <Link href="/client/profile">Manage Profile</Link>
            </Button>

            <Button asChild variant="secondary" className="rounded-xl border-0">
              <Link href="/client/jobs">Manage Jobs</Link>
            </Button>

            <LogoutButton variant="secondary" className="rounded-xl border-0" />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}