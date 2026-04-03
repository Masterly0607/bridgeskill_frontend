import Link from "next/link";
import {
  MapPin,
  Wallet,
  BriefcaseBusiness,
  GraduationCap,
  Laptop,
  Clock3,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobStatusBadge } from "@/components/jobs/job-status-badge";
import { formatCurrency } from "@/lib/format";

function InfoChip({ icon: Icon, label, variant = "default" }) {
  if (!label) return null;

  const variantClass =
    variant === "highlight"
      ? "bg-slate-900 text-white"
      : "bg-slate-100 text-slate-700";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${variantClass}`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
  );
}

function formatLabel(value) {
  if (!value) return null;

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getStudentHint(job) {
  if (job?.skillLevel === "BEGINNER" && job?.jobType === "PART_TIME") {
    return "Great for beginners";
  }

  if (job?.skillLevel === "BEGINNER") {
    return "Beginner-friendly";
  }

  if (job?.jobType === "PART_TIME") {
    return "Good for student schedules";
  }

  if (job?.jobType === "WEEKEND") {
    return "Weekend opportunity";
  }

  if (job?.jobType === "SHORT_TERM") {
    return "Short-term work";
  }

  if (job?.jobType === "FREELANCE") {
    return "Flexible freelance work";
  }

  if (job?.workMode === "REMOTE") {
    return "Remote-friendly";
  }

  return "Student-friendly opportunity";
}

export function JobCard({ job, actions, detailHref = `/jobs/${job.id}` }) {
  const studentHint = getStudentHint(job);

  return (
    <Card className="h-full rounded-2xl border-slate-200 shadow-sm transition hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <InfoChip
                icon={Sparkles}
                label={studentHint}
                variant="highlight"
              />
            </div>

            <CardTitle className="text-xl text-slate-900">
              {job.title}
            </CardTitle>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
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

          <JobStatusBadge status={job.status} />
        </div>
      </CardHeader>

      <CardContent className="flex h-full flex-col space-y-5">
        <p className="line-clamp-3 text-sm leading-7 text-slate-600">
          {job.description || "No description available."}
        </p>

        <div className="flex flex-wrap gap-2">
          <InfoChip icon={Clock3} label={formatLabel(job.jobType)} />
          <InfoChip icon={GraduationCap} label={formatLabel(job.skillLevel)} />
          <InfoChip icon={Laptop} label={formatLabel(job.workMode)} />
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            Why this job may fit students
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {job.skillLevel === "BEGINNER"
              ? "This role is suitable for students who are still building experience."
              : job.jobType === "PART_TIME"
              ? "This role may fit students who need a flexible schedule while studying."
              : job.workMode === "REMOTE"
              ? "This role may be convenient for students who prefer working from home."
              : "This opportunity can support students who want practical work experience and extra income."}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-3">
          <Button asChild className="rounded-xl">
            <Link href={detailHref}>View Details</Link>
          </Button>

          {actions}
        </div>
      </CardContent>
    </Card>
  );
}