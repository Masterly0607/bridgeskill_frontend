"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import JobForm from "@/components/jobs/job-form";
import { ROLES } from "@/lib/role";
import { getJobByIdApi, updateJobApi } from "@/services/jobs.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id;

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const response = await getJobByIdApi(jobId);
        setJob(response.data);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        toast.error(error?.response?.data?.message || "Failed to load job.");
        router.push("/client/jobs");
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId, router]);

  const handleUpdateJob = async (values) => {
    try {
      setIsSubmitting(true);

      await updateJobApi(jobId, {
        title: values.title,
        description: values.description,
        category: values.category,
        location: values.location,
        salary: Number(values.salary),
        status: job?.status || "OPEN",
      });

      toast.success("Job updated successfully");
      router.push("/client/jobs");
    } catch (error) {
      console.error("Failed to update job:", error);

      const responseData = error?.response?.data;

      if (responseData?.errors) {
        const firstError = Object.values(responseData.errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
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
        <div className="mx-auto w-full max-w-3xl space-y-6">
          <BackButton href="/client/jobs" label="Back to Jobs" />

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-slate-900">
                Edit Job
              </CardTitle>
              <CardDescription>
                Update your job posting information.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading job...</p>
              ) : (
                <JobForm
                  key={job?.id || "edit-job"}
                  initialValues={job}
                  onSubmit={handleUpdateJob}
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