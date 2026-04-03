"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BriefcaseBusiness, Clock3, GraduationCap, Sparkles } from "lucide-react";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import JobForm from "@/components/jobs/job-form";
import { ROLES } from "@/lib/role";
import { createJobApi } from "@/services/jobs.service";
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

export default function CreateJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      await createJobApi({
        title: values.title,
        description: values.description,
        category: values.category,
        location: values.location,
        salary: Number(values.salary),
        jobType: values.jobType,
        skillLevel: values.skillLevel,
        workMode: values.workMode,
      });

      toast.success("Job created successfully");
      router.push("/client/jobs");
    } catch (error) {
      const responseData = error?.response?.data;

      if (responseData?.errors) {
        const firstError = Object.values(responseData.errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
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
        <div className="mx-auto max-w-6xl space-y-8">
          <BackButton href="/client/jobs" label="Back to Jobs" />

          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Post a Job
                </p>
                <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                  Create a student-friendly job opportunity
                </h1>
                <p className="text-sm leading-7 text-slate-600 md:text-base">
                  BridgeSkill is built for students of different levels, including
                  high school, university, and beginners. Create a clear and flexible
                  job so students can understand it easily and apply with confidence.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <InfoCard
                  icon={Clock3}
                  title="Prefer flexible jobs"
                  description="Part-time, weekend, short-term, and freelance jobs are more suitable for many students."
                />
                <InfoCard
                  icon={GraduationCap}
                  title="Be beginner-friendly"
                  description="Some students may have little work experience, so clear and simple jobs work best."
                />
                <InfoCard
                  icon={BriefcaseBusiness}
                  title="Write practical descriptions"
                  description="Explain what the student will do, what skills are needed, and what makes the job manageable."
                />
                <InfoCard
                  icon={Sparkles}
                  title="Use the new job fields well"
                  description="Choose job type, skill level, and work mode clearly so students can find matching jobs faster."
                />
              </div>

              <Card className="mt-8 rounded-3xl border border-slate-200 shadow-sm">
                <CardContent className="p-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Good posting tips
                  </h2>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    <p>Use a simple title that students can understand quickly.</p>
                    <p>Keep the description practical and avoid heavy corporate wording.</p>
                    <p>Select the correct job type, skill level, and work mode to improve matching.</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Create Job</h2>
                <p className="text-sm text-slate-600">
                  Fill in the details below to publish a flexible student opportunity.
                </p>
              </div>

              <div className="mt-6">
                <JobForm
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  submitLabel="Create Job"
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}