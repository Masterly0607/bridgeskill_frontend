"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { BriefcaseBusiness, Clock3, GraduationCap, Sparkles } from "lucide-react";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { PageLoader } from "@/components/common/page-loader";
import JobForm from "@/components/jobs/job-form";
import { ROLES } from "@/lib/role";
import { getJobByIdApi, updateJobApi } from "@/services/jobs.service";
import { Card, CardContent } from "@/components/ui/card";

function InfoCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
        <Icon className="h-5 w-5 text-slate-700" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await getJobByIdApi(jobId);
      setJob(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleUpdateJob = async (values) => {
    try {
      setIsSubmitting(true);

      await updateJobApi(jobId, {
        title: values.title,
        description: values.description,
        category: values.category,
        location: values.location,
        salary: Number(values.salary),
        jobType: values.jobType,
        skillLevel: values.skillLevel,
        workMode: values.workMode,
        status: job?.status || "OPEN",
      });

      toast.success("Job updated successfully");
      router.push("/client/jobs");
    } catch (error) {
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
        <div className="mx-auto max-w-6xl space-y-8">
          <BackButton href="/client/jobs" label="Back to Jobs" />

          {loading ? (
            <PageLoader />
          ) : !job ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Job not found</h2>
              <p className="mt-3 text-slate-600">
                The requested job could not be loaded or may not exist.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
              <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="space-y-4">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    Edit Job
                  </p>
                  <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                    Improve this student-friendly job posting
                  </h1>
                  <p className="text-sm leading-7 text-slate-600 md:text-base">
                    Update the job details so students can understand the work clearly.
                    A better description and accurate job settings can attract more suitable applicants.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <InfoCard
                    icon={Clock3}
                    title="Check flexibility"
                    description="Make sure the selected job type still matches student schedules and daily life."
                  />
                  <InfoCard
                    icon={GraduationCap}
                    title="Review skill level"
                    description="If the job is suitable for beginners, keep that clear so more students feel confident to apply."
                  />
                  <InfoCard
                    icon={BriefcaseBusiness}
                    title="Keep the description practical"
                    description="Students respond better to clear duties, simple wording, and realistic expectations."
                  />
                  <InfoCard
                    icon={Sparkles}
                    title="Improve matching"
                    description="Correct job type, work mode, and skill level help the right students find your post faster."
                  />
                </div>

                <Card className="mt-8 rounded-3xl border border-slate-200 shadow-sm">
                  <CardContent className="p-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Editing tips
                    </h2>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                      <p>Keep the title clear and simple.</p>
                      <p>Use a description that students can quickly understand.</p>
                      <p>Make sure job type, work mode, and skill level still reflect the real opportunity.</p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">Update Job</h2>
                  <p className="text-sm text-slate-600">
                    Edit the details below and save your changes.
                  </p>
                </div>

                <div className="mt-6">
                  <JobForm
                    initialValues={job}
                    onSubmit={handleUpdateJob}
                    isSubmitting={isSubmitting}
                    submitLabel="Update Job"
                  />
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}