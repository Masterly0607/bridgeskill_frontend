"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { EmptyState } from "@/components/common/empty-state";
import { PageLoader } from "@/components/common/page-loader";
import { ClientApplicationCard } from "@/components/applications/client-application-card";
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

  return (
    <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <BackButton href="/client/jobs" label="Back to Jobs" />

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Applications for {job?.title || `Job #${params.id}`}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Review applicants and update their progress.
            </p>
          </div>

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