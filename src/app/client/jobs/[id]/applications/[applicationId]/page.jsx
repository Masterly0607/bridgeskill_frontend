"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { PageLoader } from "@/components/common/page-loader";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { ApplicationStatusSelect } from "@/components/applications/application-status-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/format";
import { ROLES } from "@/lib/role";
import {
  getApplicationForMyJobApi,
  updateApplicationStatusApi,
} from "@/services/applications.service";
import { getStudentProfileForClientApi } from "@/services/student-profile.service";

export default function ClientApplicationDetailPage() {
  const params = useParams();

  const [application, setApplication] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [applicationResponse, profileResponse] = await Promise.all([
        getApplicationForMyJobApi(params.applicationId),
        getStudentProfileForClientApi(params.applicationId),
      ]);

      setApplication(applicationResponse.data);
      setStudentProfile(profileResponse.data);
      setSelectedStatus(applicationResponse.data.status || "PENDING");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load application detail."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.applicationId) {
      fetchData();
    }
  }, [params?.applicationId]);

  const handleUpdateStatus = async () => {
    try {
      setUpdating(true);

      const response = await updateApplicationStatusApi(params.applicationId, {
        status: selectedStatus,
      });

      setApplication(response.data);
      setSelectedStatus(response.data.status || selectedStatus);

      toast.success("Application status updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update application status."
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <BackButton
            href={`/client/jobs/${params.id}/applications`}
            label="Back to Applications"
          />

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
                      Student #{application.studentId}
                    </CardTitle>
                  
                  </div>

                  <ApplicationStatusBadge status={application.status} />
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
              

                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Student Profile
                  </h2>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-sm font-medium text-slate-500">Phone</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">
                        {studentProfile?.phone || "N/A"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-sm font-medium text-slate-500">
                        University
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-900">
                        {studentProfile?.university || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <p className="text-sm font-medium text-slate-500">Skills</p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">
                      {studentProfile?.skills || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <p className="text-sm font-medium text-slate-500">Bio</p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">
                      {studentProfile?.bio || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Cover Letter
                  </h2>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700">
                    {application.coverLetter || "No cover letter provided."}
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Update Status
                  </h2>

                  <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:flex-row md:items-center">
                    <div className="w-full md:max-w-xs">
                      <ApplicationStatusSelect
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        disabled={updating}
                      />
                    </div>

                    <Button
                      onClick={handleUpdateStatus}
                      className="rounded-xl"
                      disabled={updating || selectedStatus === application.status}
                    >
                      {updating ? "Updating..." : "Update Status"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}