"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { PageLoader } from "@/components/common/page-loader";
import { JobForm } from "@/components/jobs/job-form";
import { ROLES } from "@/lib/role";
import { getJobByIdApi, updateJobApi } from "@/services/jobs.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientEditJobPage() {
  const params = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await getJobByIdApi(params.id);
      setJob(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchJob();
    }
  }, [params?.id]);

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      await updateJobApi(params.id, {
        ...values,
        salary: Number(values.salary),
      });

      toast.success("Job updated successfully");
      router.push("/client/jobs");
    } catch (error) {
      const responseData = error?.response?.data;

      if (responseData?.errors) {
        const firstError = Object.values(responseData.errors)[0];
        toast.error(firstError);
        return;
      }

      toast.error(responseData?.message || "Failed to update job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <BackButton href="/client/jobs" label="Back to Jobs" />

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-slate-900">
                Edit Job
              </CardTitle>
            </CardHeader>

            <CardContent>
              {loading ? (
                <PageLoader />
              ) : !job ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
                  Job not found.
                </div>
              ) : (
                <JobForm
                  key={job.id}
                  initialValues={job}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  submitLabel="Update Job"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </ProtectedRoute>
  );
}