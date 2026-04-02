"use client";

import Link from "next/link";

import { ProtectedRoute } from "@/components/common/protected-route";
import { LogoutButton } from "@/components/common/logout-button";
import { ROLES } from "@/lib/role";
import { Button } from "@/components/ui/button";

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Student Dashboard
          </h1>
          <p className="mt-3 text-slate-600">
            Manage your student profile and prepare to apply for jobs.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-xl">
              <Link href="/student/profile">Manage Profile</Link>
            </Button>
            <LogoutButton />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}