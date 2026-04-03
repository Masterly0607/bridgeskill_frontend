"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  Sparkles,
  UserRound,
  FileText,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

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

function SectionHint({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
          <Icon className="h-5 w-5 text-slate-700" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

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

  const applicantName = studentProfile?.fullName || "Applicant";

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
              <CardHeader className="space-y-4 border-b border-slate-100 pb-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                      <Sparkles className="h-4 w-4" />
                      Applicant review detail
                    </div>

                    <div>
                      <CardTitle className="text-3xl font-bold text-slate-900">
                        {applicantName}
                      </CardTitle>
                      <p className="mt-2 text-sm text-slate-600">
                        Application submitted on{" "}
                        {formatDateTime(application.appliedAt)}
                      </p>
                    </div>
                  </div>

                  <ApplicationStatusBadge status={application.status} />
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                <section className="grid gap-4 md:grid-cols-2">
                  <SectionHint
                    icon={UserRound}
                    title="Review the student profile"
                    description="Check the applicant’s education background, skills, and short bio first."
                  />
                  <SectionHint
                    icon={FileText}
                    title="Read the cover letter"
                    description="Look for practical motivation, availability, and how well the student understands the job."
                  />
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Student Profile
                  </h2>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-sm font-medium text-slate-500">
                        Full Name
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-900">
                        {studentProfile?.fullName || "N/A"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-sm font-medium text-slate-500">
                        Email
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-900">
                        {studentProfile?.email || "N/A"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-sm font-medium text-slate-500">
                        Phone
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-900">
                        {studentProfile?.phone || "N/A"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <GraduationCap className="h-4 w-4" />
                        School or University
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
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Cover Letter
                  </h2>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700">
                    {application.coverLetter || "No cover letter provided."}
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-slate-700" />
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        Review recommendation
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        Consider whether this student is suitable for the job level,
                        schedule, and practical tasks. Use the status update clearly
                        so the applicant can understand the outcome.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
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
                </section>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}