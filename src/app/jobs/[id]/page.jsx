"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  MapPin,
  BriefcaseBusiness,
  Wallet,
  Clock3,
  GraduationCap,
  Laptop,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import { BackButton } from "@/components/common/back-button";
import { JobStatusBadge } from "@/components/jobs/job-status-badge";
import { PageLoader } from "@/components/common/page-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { ROLES } from "@/lib/role";
import {
  applyToJobApi,
  getMyApplicationsApi,
} from "@/services/applications.service";
import { getJobByIdApi } from "@/services/jobs.service";
import { useAuthStore } from "@/store/auth-store";

function formatLabel(value) {
  if (!value) return "Not specified";

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getStudentFitSummary(job) {
  if (!job) return "This opportunity may suit students looking for practical work experience.";

  if (job.skillLevel === "BEGINNER" && job.jobType === "PART_TIME") {
    return "This looks like a beginner-friendly part-time opportunity that can fit student life well.";
  }

  if (job.skillLevel === "BEGINNER" && job.workMode === "REMOTE") {
    return "This looks suitable for beginners and may be easier for students who prefer remote work.";
  }

  if (job.jobType === "WEEKEND") {
    return "This looks useful for students who are only available on weekends.";
  }

  if (job.jobType === "SHORT_TERM") {
    return "This may suit students who want temporary work and quick practical experience.";
  }

  if (job.jobType === "FREELANCE") {
    return "This may suit students who want flexible freelance work alongside studying.";
  }

  if (job.workMode === "REMOTE") {
    return "This remote opportunity may be convenient for students who want flexible work from home.";
  }

  if (job.skillLevel === "BEGINNER") {
    return "This opportunity appears suitable for students who are still building experience.";
  }

  return "This opportunity may help students build skills, experience, and extra income.";
}

function getApplyHint(job) {
  if (!job) return "Write a short and clear cover letter before applying.";

  if (job.skillLevel === "BEGINNER") {
    return "Even if you do not have much experience yet, you can still apply if your skills match the job.";
  }

  if (job.jobType === "PART_TIME") {
    return "This role may work well if you need a job that fits around your study schedule.";
  }

  if (job.workMode === "REMOTE") {
    return "This role may be convenient if you are looking for a remote opportunity.";
  }

  return "Make sure your cover letter clearly explains why this job matches your skills and availability.";
}

export default function JobDetailPage() {
  const params = useParams();
  const { isAuthenticated, user } = useAuthStore();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [myApplications, setMyApplications] = useState([]);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  const isStudent = isAuthenticated && user?.roleId === ROLES.STUDENT;
  const isClosed = job?.status === "CLOSED";

  const hasApplied = useMemo(() => {
    return myApplications.some(
      (application) => Number(application.jobId) === Number(params?.id)
    );
  }, [myApplications, params?.id]);

  const studentFitSummary = useMemo(() => getStudentFitSummary(job), [job]);
  const applyHint = useMemo(() => getApplyHint(job), [job]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await getJobByIdApi(params.id);
      setJob(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load job details."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchMyApplications = async () => {
    if (!isStudent) return;

    try {
      const response = await getMyApplicationsApi();
      setMyApplications(response.data || []);
    } catch (error) {
      console.error("Failed to load student applications", error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchJob();
    }
  }, [params?.id]);

  useEffect(() => {
    fetchMyApplications();
  }, [isStudent]);

  const openApplyModal = () => {
    if (isClosed) {
      toast.error("This job is closed and can no longer accept applications.");
      return;
    }

    if (hasApplied) {
      toast.error("You have already applied for this job.");
      return;
    }

    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    if (applying) return;
    setIsApplyModalOpen(false);
    setCoverLetter("");
  };

  const handleApply = async () => {
    const trimmedCoverLetter = coverLetter.trim();

    if (!trimmedCoverLetter) {
      toast.error("Please write your cover letter.");
      return;
    }

    if (trimmedCoverLetter.length < 20) {
      toast.error("Cover letter must be at least 20 characters.");
      return;
    }

    if (isClosed) {
      toast.error("This job is closed and can no longer accept applications.");
      return;
    }

    try {
      setApplying(true);

      await applyToJobApi(params.id, {
        coverLetter: trimmedCoverLetter,
      });

      toast.success("Application submitted successfully");
      setIsApplyModalOpen(false);
      setCoverLetter("");
      await fetchMyApplications();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to apply for this job."
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <PageLoader />
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <BackButton href="/jobs" label="Back to Jobs" />

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              Job not found
            </h2>
            <p className="mt-3 text-slate-600">
              The requested job could not be loaded or may not exist.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <BackButton href="/jobs" label="Back to Jobs" />

          <Card className="rounded-3xl border border-slate-200 shadow-sm">
            <CardHeader className="space-y-6 border-b border-slate-100 pb-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    <Sparkles className="h-4 w-4" />
                    Student-friendly opportunity
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                      Job Details
                    </p>

                    <CardTitle className="text-4xl font-bold text-slate-900">
                      {job.title}
                    </CardTitle>

                    <p className="max-w-3xl text-sm leading-7 text-slate-600">
                      {studentFitSummary}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <BriefcaseBusiness className="h-4 w-4" />
                        {job.category || "Uncategorized"}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {job.location || "Not specified"}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        {formatCurrency(job.salary)}
                      </span>
                    </div>
                  </div>
                </div>

                <JobStatusBadge status={job.status} />
              </div>
            </CardHeader>

            <CardContent className="space-y-8 p-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <Clock3 className="h-4 w-4" />
                    Posted At
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {formatDateTime(job.createdAt)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <BriefcaseBusiness className="h-4 w-4" />
                    Job Type
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {formatLabel(job.jobType)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <GraduationCap className="h-4 w-4" />
                    Skill Level
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {formatLabel(job.skillLevel)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <Laptop className="h-4 w-4" />
                    Work Mode
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {formatLabel(job.workMode)}
                  </p>
                </div>
              </div>

              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-slate-700" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Why this job may fit students
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {job.skillLevel === "BEGINNER"
                        ? "This job is marked as beginner-friendly, so it may be suitable even if you are still building confidence and work experience."
                        : job.jobType === "PART_TIME"
                        ? "This part-time setup may be easier to balance with school or university schedules."
                        : job.workMode === "REMOTE"
                        ? "This remote setup may be convenient for students who prefer flexible working arrangements."
                        : "This opportunity may still be valuable for students who want practical work, income, and new experience."}
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Job Description
                </h2>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700">
                  {job.description || "No description available."}
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Application
                </h2>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  {!isAuthenticated ? (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Sign in to continue
                        </p>
                        <p className="text-sm text-slate-600">
                          Only student accounts can apply for this job.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button asChild className="rounded-xl" disabled={isClosed}>
                          <Link href="/login">
                            {isClosed ? "Job Closed" : "Login to Apply"}
                          </Link>
                        </Button>

                        <Button asChild variant="outline" className="rounded-xl">
                          <Link href="/register">Create Account</Link>
                        </Button>
                      </div>
                    </div>
                  ) : isStudent ? (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {isClosed
                            ? "This job is closed"
                            : hasApplied
                            ? "You have already applied"
                            : "Ready to apply?"}
                        </p>
                        <p className="text-sm text-slate-600">
                          {isClosed
                            ? "Applications are no longer being accepted for this job."
                            : hasApplied
                            ? "You can review your submitted applications anytime."
                            : applyHint}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={openApplyModal}
                          disabled={isClosed || applying || hasApplied}
                          className="rounded-xl"
                        >
                          {isClosed
                            ? "Job Closed"
                            : hasApplied
                            ? "Already Applied"
                            : "Apply Now"}
                        </Button>

                        <Button asChild variant="outline" className="rounded-xl">
                          <Link href="/student/applications">My Applications</Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-slate-900">
                        Student account required
                      </p>
                      <p className="text-sm text-slate-600">
                        Only student accounts can apply for jobs.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Apply for {job.title}
              </h2>
              <p className="text-sm text-slate-600">
                Write a short cover letter to introduce yourself and explain why
                you are a good fit for this opportunity.
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-900">
                Before you submit
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Mention your relevant skills, your availability, and why this job
                fits your current study life.
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <label
                htmlFor="coverLetter"
                className="text-sm font-medium text-slate-900"
              >
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                rows={8}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write your cover letter here..."
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                disabled={applying}
              />
              <p className="text-xs text-slate-500">Minimum 20 characters.</p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={closeApplyModal}
                disabled={applying}
              >
                Cancel
              </Button>

              <Button
                type="button"
                className="rounded-xl"
                onClick={handleApply}
                disabled={applying}
              >
                {applying ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}