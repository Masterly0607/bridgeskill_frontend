"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { EmptyState } from "@/components/common/empty-state";
import { PageLoader } from "@/components/common/page-loader";
import { ClientApplicationCard } from "@/components/applications/client-application-card";
import { Card, CardContent } from "@/components/ui/card";
import { ROLES } from "@/lib/role";
import { getJobByIdApi } from "@/services/jobs.service";
import { getApplicationsForMyJobApi } from "@/services/applications.service";

export default function ClientJobApplicationsPage() {
  const params = useParams();

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [jobResponse, applicationsResponse] = await Promise.all([
        getJobByIdApi(params.id),
        getApplicationsForMyJobApi(params.id),
      ]);

      setJob(jobResponse.data);
      setApplications(applicationsResponse.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load job applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter((item) => item.status === "PENDING").length,
      shortlisted: applications.filter((item) => item.status === "SHORTLISTED").length,
    };
  }, [applications]);

  return (
    <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <BackButton href="/client/jobs" label="Back to Jobs" />

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                <Sparkles className="h-4 w-4" />
                Applicant review
              </div>

              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Applicants for {job?.title || "This Job"}
              </h1>

              <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
                Review student applications, check profiles and cover letters,
                and update each applicant to the right stage.
              </p>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500">Total Applicants</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stats.total}</p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <FileText className="h-4 w-4" />
                  Pending Review
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
            <h2 className="text-xl font-semibold text-slate-900">
              Review guidance
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              A good review usually starts with the student’s profile, practical
              skills, and cover letter. Use status updates clearly so applicants
              can understand their progress.
            </p>
          </section>

          {loading ? (
            <PageLoader />
          ) : applications.length === 0 ? (
            <EmptyState
              title="No applications yet"
              description="This job does not have any applications yet."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {applications.map((application) => (
                <ClientApplicationCard
                  key={application.id}
                  application={application}
                  jobId={params.id}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}