"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, BriefcaseBusiness, Wallet } from "lucide-react";
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

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Job Overview
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

          <CardContent className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Posted At</p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {formatDateTime(job.createdAt)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">
                  Last Updated
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {formatDateTime(job.updatedAt)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">
                Job Description
              </h2>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700">
                {job.description || "No description available."}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">
                Application
              </h2>

              <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {!isAuthenticated ? (
                  <>
                    <Button asChild className="rounded-xl">
                      <Link href="/login">Login to Apply</Link>
                    </Button>

                    <Button asChild variant="outline" className="rounded-xl">
                      <Link href="/register">Create Account</Link>
                    </Button>
                  </>
                ) : isStudent ? (
                  <>
                    <Button
                      onClick={handleApply}
                      disabled={applying || hasApplied}
                      className="rounded-xl"
                    >
                      {hasApplied
                        ? "Already Applied"
                        : applying
                        ? "Applying..."
                        : "Apply Now"}
                    </Button>

                    <Button asChild variant="outline" className="rounded-xl">
                      <Link href="/student/applications">My Applications</Link>
                    </Button>
                  </>
                ) : (
                  <p className="text-sm text-slate-600">
                    Only student accounts can apply for jobs.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}