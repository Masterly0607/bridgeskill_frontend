"use client";

import { ProtectedRoute } from "@/components/common/protected-route";
import { ROLES } from "@/lib/role";
import { LogoutButton } from "@/components/common/logout-button";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="mt-3 text-slate-600">
            Protected admin area. Admin monitoring and application overview will be added next.
          </p>
          <div className="mt-6">
  <LogoutButton />
</div>
        </div>
      </main>
    </ProtectedRoute>
  );
}