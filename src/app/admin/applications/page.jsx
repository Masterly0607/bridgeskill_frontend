"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { EmptyState } from "@/components/common/empty-state";
import { PageLoader } from "@/components/common/page-loader";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/format";
import { ROLES } from "@/lib/role";
import { getAllApplicationsForAdminApi } from "@/services/admin.service";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getAllApplicationsForAdminApi();
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
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <BackButton href="/admin/dashboard" label="Back to Dashboard" />

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              All Applications
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              View application activity across the platform.
            </p>
          </div>

          {loading ? (
            <PageLoader />
          ) : applications.length === 0 ? (
            <EmptyState
              title="No applications found"
              description="There are no applications available yet."
            />
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <Card key={application.id} className="rounded-2xl border-slate-200 shadow-sm">
                  <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-slate-900">
                     {application.jobTitle ?? "Deleted Job"}
                      </p>

                      <p className="text-sm text-slate-600">
                        Student: {application.studentName || `#${application.studentId}`}
                      </p>

                      <p className="text-sm text-slate-600">
                        Job ID: {application.jobId}
                      </p>

                      <p className="text-xs text-slate-500">
                        Applied:{" "}
                        {formatDateTime(application.appliedAt || application.createdAt)}
                      </p>

                      <p className="line-clamp-2 text-sm text-slate-600">
                        {application.coverLetter || "No cover letter provided."}
                      </p>
                    </div>

                    <ApplicationStatusBadge status={application.status} />
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