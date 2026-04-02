"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { JobForm } from "@/components/jobs/job-form";
import { ROLES } from "@/lib/role";
import { createJobApi } from "@/services/jobs.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientCreateJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      await createJobApi({
        ...values,
        salary: Number(values.salary),
      });

      toast.success("Job created successfully");
      router.push("/client/jobs");
    } catch (error) {
      const responseData = error?.response?.data;

      if (responseData?.errors) {
        const firstError = Object.values(responseData.errors)[0];
        toast.error(firstError);
        return;
      }

      toast.error(responseData?.message || "Failed to create job.");
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
                Create Job
              </CardTitle>
            </CardHeader>

            <CardContent>
              <JobForm
                initialValues={{}}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitLabel="Create Job"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </ProtectedRoute>
  );
}