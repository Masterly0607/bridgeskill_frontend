"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { BackButton } from "@/components/common/back-button";
import { ProtectedRoute } from "@/components/common/protected-route";
import { PageLoader } from "@/components/common/page-loader";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { ROLES } from "@/lib/role";
import { formatDateTime } from "@/lib/format";
import { getMyApplicationByIdApi } from "@/services/applications.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentApplicationDetailPage() {
  const params = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await getMyApplicationByIdApi(params.id);
      setApplication(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load application detail."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchApplication();
    }
  }, [params?.id]);

  return (
    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl space-y-6">
         <BackButton href="/student/applications" label="Back to Applications" />

          {loading ? (
            <PageLoader />
          ) : !application ? (
            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardContent className="p-8 text-center text-slate-600">
                Application not found.
              </CardContent>
            </Card>
          ) : (
            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-3xl font-bold text-slate-900">
                      {application.jobTitle}
                    </CardTitle>
                    <p className="mt-2 text-sm text-slate-600">
                      Job ID: {application.jobId}
                    </p>
                  </div>

                  <ApplicationStatusBadge status={application.status} />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-medium text-slate-500">Applied At</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {formatDateTime(application.appliedAt)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-medium text-slate-500">Status</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {application.status}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}