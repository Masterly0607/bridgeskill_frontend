"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { EmptyState } from "@/components/common/empty-state";
import { PageLoader } from "@/components/common/page-loader";
import { JobCard } from "@/components/jobs/job-card";
import { Button } from "@/components/ui/button";
import { ROLES } from "@/lib/role";
import { closeJobApi, getJobsApi, reopenJobApi } from "@/services/jobs.service";
import { useAuthStore } from "@/store/auth-store";

export default function ClientJobsPage() {
  const { user, isHydrated } = useAuthStore();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

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
  }, [jobs, user?.id]);

  const handleCloseJob = async (job) => {
    try {
      setActionLoadingId(job.id);
      await closeJobApi(job);
      toast.success("Job closed successfully");
      await fetchJobs();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to close job.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReopenJob = async (job) => {
    try {
      setActionLoadingId(job.id);
      await reopenJobApi(job);
      toast.success("Job reopened successfully");
      await fetchJobs();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reopen job.");
    } finally {
      setActionLoadingId(null);
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

          {!isHydrated || loading ? (
            <PageLoader />
          ) : myJobs.length === 0 ? (
            <EmptyState
              title="No jobs yet"
              description="You have not created any jobs yet."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {myJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  detailHref={`/client/jobs/${job.id}/applications`}
                  actions={
                    <>
                      <Button asChild variant="outline" className="rounded-xl">
                        <Link href={`/client/jobs/${job.id}/edit`}>Edit</Link>
                      </Button>

                      {job.status === "OPEN" ? (
                        <Button
                          variant="outline"
                          className="rounded-xl"
                          onClick={() => handleCloseJob(job)}
                          disabled={actionLoadingId === job.id}
                        >
                          {actionLoadingId === job.id ? "Closing..." : "Close Job"}
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="rounded-xl"
                          onClick={() => handleReopenJob(job)}
                          disabled={actionLoadingId === job.id}
                        >
                          {actionLoadingId === job.id ? "Reopening..." : "Reopen Job"}
                        </Button>
                      )}
                    </>
                  }
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}