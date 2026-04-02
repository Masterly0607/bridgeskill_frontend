"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, BriefcaseBusiness, Wallet, Clock3 } from "lucide-react";
import { toast } from "sonner";

import { BackButton } from "@/components/common/back-button";
import { JobStatusBadge } from "@/components/jobs/job-status-badge";
import { PageLoader } from "@/components/common/page-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { ROLES } from "@/lib/role";
import {
  applyToJobApi,
  getMyApplicationsApi,
} from "@/services/applications.service";
import { getJobByIdApi } from "@/services/jobs.service";
import { useAuthStore } from "@/store/auth-store";

export default function JobDetailPage() {
  const params = useParams();
  const { isAuthenticated, user } = useAuthStore();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [myApplications, setMyApplications] = useState([]);

  const isStudent = isAuthenticated && user?.roleId === ROLES.STUDENT;
  const isClosed = job?.status === "CLOSED";

  const hasApplied = useMemo(() => {
    return myApplications.some(
      (application) => Number(application.jobId) === Number(params?.id)
    );
  }, [myApplications, params?.id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await getJobByIdApi(params.id);
      setJob(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load job details."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchMyApplications = async () => {
    if (!isStudent) return;

    try {
      const response = await getMyApplicationsApi();
      setMyApplications(response.data || []);
    } catch (error) {
      console.error("Failed to load student applications", error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchJob();
    }
  }, [params?.id]);

  useEffect(() => {
    fetchMyApplications();
  }, [isStudent]);

  const handleApply = async () => {
    if (isClosed) {
      toast.error("This job is closed and can no longer accept applications.");
      return;
    }

    try {
      setApplying(true);

      await applyToJobApi(params.id, {
        coverLetter: "Interested in this opportunity.",
      });

      toast.success("Application submitted successfully");
      await fetchMyApplications();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to apply for this job."
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <PageLoader />
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <BackButton href="/jobs" label="Back to Jobs" />

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              Job not found
            </h2>
            <p className="mt-3 text-slate-600">
              The requested job could not be loaded or may not exist.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <BackButton href="/jobs" label="Back to Jobs" />

        <Card className="rounded-3xl border border-slate-200 shadow-sm">
          <CardHeader className="space-y-6 border-b border-slate-100 pb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Job Details
                </p>

                <CardTitle className="text-4xl font-bold text-slate-900">
                  {job.title}
                </CardTitle>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4" />
                    {job.category || "Uncategorized"}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {job.location || "Not specified"}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    {formatCurrency(job.salary)}
                  </span>
                </div>
              </div>

              <JobStatusBadge status={job.status} />
            </div>
          </CardHeader>

          <CardContent className="space-y-8 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <Clock3 className="h-4 w-4" />
                  Posted At
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {formatDateTime(job.createdAt)}
                </p>
              </div>

            </div>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">
                Job Description
              </h2>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700">
                {job.description || "No description available."}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">
                Application
              </h2>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Sign in to continue
                      </p>
                      <p className="text-sm text-slate-600">
                        Only student accounts can apply for this job.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button asChild className="rounded-xl" disabled={isClosed}>
                        <Link href="/login">
                          {isClosed ? "Job Closed" : "Login to Apply"}
                        </Link>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl"
                      >
                        <Link href="/register">Create Account</Link>
                      </Button>
                    </div>
                  </div>
                ) : isStudent ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {isClosed
                          ? "This job is closed"
                          : hasApplied
                          ? "You have already applied"
                          : "Ready to apply?"}
                      </p>
                      <p className="text-sm text-slate-600">
                        {isClosed
                          ? "Applications are no longer being accepted for this job."
                          : hasApplied
                          ? "You can review your submitted applications anytime."
                          : "Submit your application if this opportunity matches your profile."}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={handleApply}
                        disabled={isClosed || applying || hasApplied}
                        className="rounded-xl"
                      >
                        {isClosed
                          ? "Job Closed"
                          : hasApplied
                          ? "Already Applied"
                          : applying
                          ? "Applying..."
                          : "Apply Now"}
                      </Button>

                      <Button asChild variant="outline" className="rounded-xl">
                        <Link href="/student/applications">My Applications</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-slate-900">
                      Student account required
                    </p>
                    <p className="text-sm text-slate-600">
                      Only student accounts can apply for jobs.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}