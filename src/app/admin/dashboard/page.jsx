"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck, Users, BriefcaseBusiness, FileText } from "lucide-react";
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
import { useAuthStore } from "@/store/auth-store";

export default function AdminDashboardPage() {
  const { user } = useAuthStore();
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
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Admin Portal
                </p>
                <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                  Welcome back{user?.fullName ? `, ${user.fullName}` : ""}
                </h1>
                <p className="max-w-2xl text-slate-600">
                  Monitor users, jobs, and application activity across the
                  BridgeSkill platform.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-xl">
                  <Link href="/admin/applications">View All Applications</Link>
                </Button>
                <LogoutButton variant="secondary" className="rounded-xl border-0" />
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard title="Total Users" value={summary?.totalUsers ?? 0} />
            <SummaryCard title="Students" value={summary?.totalStudents ?? 0} />
            <SummaryCard title="Clients" value={summary?.totalClients ?? 0} />
            <SummaryCard title="Jobs" value={summary?.totalJobs ?? 0} />
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Applications"
              value={summary?.totalApplications ?? 0}
            />
            <SummaryCard
              title="Pending"
              value={summary?.pendingApplications ?? 0}
            />
            <SummaryCard
              title="Shortlisted"
              value={summary?.shortlistedApplications ?? 0}
            />
            <SummaryCard
              title="Rejected"
              value={summary?.rejectedApplications ?? 0}
            />
          </section>

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
              <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <Card className="rounded-3xl border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      Platform overview
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                        <Users className="h-5 w-5 text-slate-700" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        User activity
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Track total registered students and clients in the system.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                        <BriefcaseBusiness className="h-5 w-5 text-slate-700" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        Job activity
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Review how many job opportunities are currently posted.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                        <FileText className="h-5 w-5 text-slate-700" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        Application activity
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Follow pending, shortlisted, and rejected applications.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      Admin actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-full flex-col space-y-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 text-slate-700" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Review application activity
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            Open the applications page to monitor platform usage.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Button asChild className="w-full rounded-xl">
                        <Link href="/admin/applications">Go to Applications</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-3xl border border-slate-200 shadow-sm">
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
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-slate-900">
                                {application.jobTitle ?? "Deleted Job"}
                              </p>
                              <p className="mt-1 text-sm text-slate-600">
                                Applicant:{" "}
                                {application.studentName || "Student account"}
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

                <Card className="rounded-3xl border border-slate-200 shadow-sm">
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
                            Company: {job.companyName || "Client account"}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Posted: {formatDateTime(job.createdAt)}
                          </p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </section>
            </>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}