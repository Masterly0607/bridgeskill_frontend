"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Clock3,
  Eye,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { PageLoader } from "@/components/common/page-loader";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { formatDateTime } from "@/lib/format";
import { ROLES } from "@/lib/role";
import { getMyApplicationByIdApi } from "@/services/applications.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATUS_CONTENT = {
  PENDING: {
    title: "Application submitted",
    description:
      "Your application has been sent successfully and is waiting for employer review.",
    nextStep:
      "Stay patient and keep checking for updates. You can continue exploring other flexible jobs too.",
    icon: Clock3,
  },
  REVIEWED: {
    title: "Application under review",
    description:
      "The employer has reviewed your application and may update the result soon.",
    nextStep:
      "This is a good sign that your application was seen. Keep watching for the next status update.",
    icon: Eye,
  },
  SHORTLISTED: {
    title: "You have been shortlisted",
    description:
      "Congratulations. The employer is interested in your profile and has moved your application forward.",
    nextStep:
      "Review the job again, prepare your communication, and stay ready for possible contact or interview instructions.",
    icon: CheckCircle2,
  },
  REJECTED: {
    title: "Application not selected",
    description:
      "This application was not selected for the next stage.",
    nextStep:
      "Do not be discouraged. Many students get their first chance by applying again to other suitable jobs.",
    icon: XCircle,
  },
};

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

  const statusInfo = useMemo(() => {
    if (!application?.status) return null;
    return (
      STATUS_CONTENT[application.status] || {
        title: "Application status",
        description: "Your application status has been updated.",
        nextStep: "Please check again later for more updates.",
        icon: FileText,
      }
    );
  }, [application]);

  const StatusIcon = statusInfo?.icon || FileText;

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
            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardHeader className="space-y-4 border-b border-slate-100 pb-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                      <Sparkles className="h-4 w-4" />
                      Student application progress
                    </div>

                    <div>
                      <CardTitle className="text-3xl font-bold text-slate-900">
                        {application.jobTitle || "Job Application"}
                      </CardTitle>
                      <p className="mt-2 text-sm text-slate-600">
                        Track your application progress and stay ready for the next step.
                      </p>
                    </div>
                  </div>

                  <ApplicationStatusBadge status={application.status} />
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm font-medium text-slate-500">
                      Applied On
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900">
                      {formatDateTime(application.appliedAt)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm font-medium text-slate-500">
                      Current Status
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900">
                      {application.status}
                    </p>
                  </div>
                </div>

                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-xl bg-slate-100 p-2">
                      <StatusIcon className="h-5 w-5 text-slate-700" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                          {statusInfo.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {statusInfo.description}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-sm font-medium text-slate-900">
                          What you should do next
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {statusInfo.nextStep}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Helpful reminder
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Small student jobs are also a way to build confidence and real-life
                    skills. Even one application can help you learn how employers review candidates.
                  </p>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Your Cover Letter
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {application.coverLetter || "No cover letter provided."}
                  </p>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Quick Actions
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button asChild className="rounded-xl">
                      <Link href={`/jobs/${application.jobId}`}>View Job</Link>
                    </Button>

                    <Button asChild variant="outline" className="rounded-xl">
                      <Link href="/student/applications">My Applications</Link>
                    </Button>

                    {(application.status === "REJECTED" ||
                      application.status === "PENDING" ||
                      application.status === "REVIEWED") && (
                      <Button asChild variant="outline" className="rounded-xl">
                        <Link href="/jobs">
                          <Search className="mr-2 h-4 w-4" />
                          Browse Jobs
                        </Link>
                      </Button>
                    )}
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