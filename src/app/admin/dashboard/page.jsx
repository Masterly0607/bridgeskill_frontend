"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { LogoutButton } from "@/components/common/logout-button";
import { PageLoader } from "@/components/common/page-loader";
import { SummaryCard } from "@/components/admin/summary-card";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/format";
import { ROLES } from "@/lib/role";
import { getAdminDashboardSummaryApi } from "@/services/admin.service";

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await getAdminDashboardSummaryApi();
      setSummary(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="mt-3 text-slate-600">
              Monitor users, jobs, and application activity across the platform.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-xl">
                <Link href="/admin/applications">View All Applications</Link>
              </Button>
              <LogoutButton variant="secondary" className="rounded-xl border-0" />
            </div>
          </div>

          {loading ? (
            <PageLoader />
          ) : !summary ? (
            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardContent className="p-8 text-center text-slate-600">
                No dashboard data available.
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard title="Total Users" value={summary.totalUsers ?? 0} />
                <SummaryCard title="Total Students" value={summary.totalStudents ?? 0} />
                <SummaryCard title="Total Clients" value={summary.totalClients ?? 0} />
                <SummaryCard title="Total Jobs" value={summary.totalJobs ?? 0} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                  title="Total Applications"
                  value={summary.totalApplications ?? 0}
                />
                <SummaryCard
                  title="Pending Applications"
                  value={summary.pendingApplications ?? 0}
                />
                <SummaryCard
                  title="Shortlisted"
                  value={summary.shortlistedApplications ?? 0}
                />
                <SummaryCard
                  title="Rejected"
                  value={summary.rejectedApplications ?? 0}
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-3xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      Recent Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!summary.recentApplications?.length ? (
                      <p className="text-sm text-slate-600">
                        No recent applications.
                      </p>
                    ) : (
                      summary.recentApplications.map((application) => (
                        <div
                          key={application.id}
                          className="rounded-2xl border border-slate-200 p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="font-semibold text-slate-900">
                               {application.jobTitle ?? "Deleted Job"}
                              </p>
                              <p className="mt-1 text-sm text-slate-600">
                                Student: {application.studentName || `#${application.studentId}`}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                Applied: {formatDateTime(application.appliedAt)}
                              </p>
                            </div>

                            <ApplicationStatusBadge status={application.status} />
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      Recent Jobs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!summary.recentJobs?.length ? (
                      <p className="text-sm text-slate-600">No recent jobs.</p>
                    ) : (
                      summary.recentJobs.map((job) => (
                        <div
                          key={job.id}
                          className="rounded-2xl border border-slate-200 p-4"
                        >
                          <p className="font-semibold text-slate-900">
                            {job.title}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            Company: {job.companyName || `Client #${job.clientId}`}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Posted: {formatDateTime(job.createdAt)}
                          </p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}