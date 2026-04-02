"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, BriefcaseBusiness, Wallet, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { getJobByIdApi } from "@/services/jobs.service";
import { JobStatusBadge } from "@/components/jobs/job-status-badge";
import { PageLoader } from "@/components/common/page-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDateTime } from "@/lib/format";

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (params?.id) {
      fetchJob();
    }
  }, [params?.id]);

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
        <div className="mx-auto max-w-5xl rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Job not found</h2>
          <p className="mt-3 text-slate-600">
            The requested job could not be loaded or may not exist.
          </p>
          <Button asChild className="mt-6 rounded-xl">
            <Link href="/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <CardTitle className="text-3xl font-bold text-slate-900">
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
                <p className="text-sm font-medium text-slate-500">Last Updated</p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {formatDateTime(job.updatedAt)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Job Description
              </h2>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700">
                {job.description || "No description available."}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-xl">
                <Link href="/login">Login to Apply</Link>
              </Button>

              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}