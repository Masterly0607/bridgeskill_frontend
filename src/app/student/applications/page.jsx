"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { EmptyState } from "@/components/common/empty-state";
import { PageLoader } from "@/components/common/page-loader";
import { ApplicationCard } from "@/components/applications/application-card";
import { ROLES } from "@/lib/role";
import { getMyApplicationsApi } from "@/services/applications.service";
import { Button } from "@/components/ui/button";

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

  return (
    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <BackButton href="/student/dashboard" label="Back to Dashboard" />

            <Button asChild className="rounded-xl">
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Applications
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Track the status of jobs you have applied for.
            </p>
          </div>

          {loading ? (
            <PageLoader />
          ) : applications.length === 0 ? (
            <EmptyState
              title="No applications yet"
              description="You have not applied for any jobs yet. Browse jobs and start applying."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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