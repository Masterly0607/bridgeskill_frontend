"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { EmptyState } from "@/components/common/empty-state";
import { PageLoader } from "@/components/common/page-loader";
import CloseJobDialog from "@/components/jobs/close-job-dialog";
import { JobStatusBadge } from "@/components/jobs/job-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { ROLES } from "@/lib/role";
import { useAuthStore } from "@/store/auth-store";
import {
  closeJobApi,
  getJobsApi,
  reopenJobApi,
} from "@/services/jobs.service";

export default function ClientJobsPage() {
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [closingId, setClosingId] = useState(null);
  const [reopeningId, setReopeningId] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getJobsApi();
      setJobs(response.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const myJobs = useMemo(() => {
    if (!user?.id) return [];
    return jobs.filter((job) => Number(job.clientId) === Number(user.id));
  }, [jobs, user]);

  const handleCloseJob = async (job) => {
    try {
      setClosingId(job.id);
      await closeJobApi(job);
      toast.success("Job closed successfully");
      await fetchJobs();
    } catch (error) {
      const responseData = error?.response?.data;

      if (responseData?.errors) {
        const firstError = Object.values(responseData.errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
        return;
      }

      toast.error(responseData?.message || "Failed to close job.");
    } finally {
      setClosingId(null);
    }
  };

  const handleReopenJob = async (job) => {
    try {
      setReopeningId(job.id);
      await reopenJobApi(job);
      toast.success("Job reopened successfully");
      await fetchJobs();
    } catch (error) {
      const responseData = error?.response?.data;

      if (responseData?.errors) {
        const firstError = Object.values(responseData.errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
        return;
      }

      toast.error(responseData?.message || "Failed to reopen job.");
    } finally {
      setReopeningId(null);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <BackButton href="/client/dashboard" label="Back to Dashboard" />

            <Button asChild className="rounded-xl">
              <Link href="/client/jobs/new">Create Job</Link>
            </Button>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Jobs</h1>
            <p className="mt-2 text-sm text-slate-600">
              Create, update, and manage jobs posted by your company.
            </p>
          </div>

          {loading ? (
            <PageLoader />
          ) : myJobs.length === 0 ? (
            <EmptyState
              title="No jobs yet"
              description="You have not created any jobs yet."
            />
          ) : (
            <div className="space-y-4">
              {myJobs.map((job) => (
                <Card
                  key={job.id}
                  className="rounded-2xl border-slate-200 shadow-sm"
                >
                  <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-semibold text-slate-900">
                          {job.title}
                        </h2>
                        <JobStatusBadge status={job.status} />
                      </div>

                      <p className="text-sm text-slate-600">
                        {job.category} • {job.location} •{" "}
                        {formatCurrency(job.salary)}
                      </p>

                      <p className="line-clamp-2 text-sm text-slate-600">
                        {job.description}
                      </p>

                      <p className="text-xs text-slate-500">
                        Posted: {formatDateTime(job.createdAt)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        asChild
                        variant="secondary"
                        className="rounded-xl border-0"
                      >
                        <Link href={`/client/jobs/${job.id}/edit`}>Edit</Link>
                      </Button>

                      <Button
                        asChild
                        variant="secondary"
                        className="rounded-xl border-0"
                      >
                        <Link href={`/client/jobs/${job.id}/applications`}>
                          View Applications
                        </Link>
                      </Button>

                      {job.status === "OPEN" ? (
                        <CloseJobDialog
                          jobTitle={job.title}
                          isClosing={closingId === job.id}
                          onConfirm={() => handleCloseJob(job)}
                        />
                      ) : (
                        <Button
                          onClick={() => handleReopenJob(job)}
                          disabled={reopeningId === job.id}
                          className="rounded-xl"
                        >
                          {reopeningId === job.id
                            ? "Reopening..."
                            : "Reopen Job"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}