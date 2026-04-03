"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Sparkles, BriefcaseBusiness, CheckCircle2, Clock3 } from "lucide-react";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { EmptyState } from "@/components/common/empty-state";
import { PageLoader } from "@/components/common/page-loader";
import { ApplicationCard } from "@/components/applications/application-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROLES } from "@/lib/role";
import { getMyApplicationsApi } from "@/services/applications.service";

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getMyApplicationsApi();
      setApplications(response.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter((item) => item.status === "PENDING").length,
      shortlisted: applications.filter((item) => item.status === "SHORTLISTED").length,
    };
  }, [applications]);

  return (
    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <BackButton href="/student/dashboard" label="Back to Dashboard" />

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  <Sparkles className="h-4 w-4" />
                  Track your progress
                </div>

                <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                  My Applications
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                  Review the jobs you applied for, check the latest status,
                  and keep moving forward with flexible student opportunities.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-xl">
                  <Link href="/jobs">Browse More Jobs</Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500">Total Applications</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stats.total}</p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <Clock3 className="h-4 w-4" />
                  Pending
                </div>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stats.pending}</p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <CheckCircle2 className="h-4 w-4" />
                  Shortlisted
                </div>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stats.shortlisted}
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <BriefcaseBusiness className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Keep applying with confidence
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Flexible jobs can be a good starting point for students to earn
                  income, build confidence, and gain practical real-world experience.
                </p>
              </div>
            </div>
          </section>

          {loading ? (
            <PageLoader />
          ) : applications.length === 0 ? (
            <EmptyState
              title="No applications yet"
              description="You have not applied to any jobs yet. Start exploring flexible student-friendly opportunities."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}