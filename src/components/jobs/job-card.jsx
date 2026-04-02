"use client";

import Link from "next/link";

import CloseJobDialog from "@/components/jobs/close-job-dialog";
import { JobStatusBadge } from "@/components/jobs/job-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function formatSalary(value) {
  if (value === null || value === undefined || value === "") {
    return "$0";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatDate(value) {
  if (!value) return "N/A";

  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function JobCard({ job, onJobUpdated }) {
  const isClosed = job?.status === "CLOSED";

  return (
    <Card className="h-full rounded-3xl border border-slate-200 shadow-sm transition hover:shadow-md">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-2xl font-bold text-slate-900">
            {job.title}
          </h3>

          <JobStatusBadge status={job.status} />
        </div>

        <div className="space-y-2">
          <p className="text-base text-slate-600">
            {job.category || "N/A"} • {job.location || "N/A"}
          </p>

          <p className="text-xl font-semibold text-slate-900">
            {formatSalary(job.salary)}
          </p>

          <p className="text-sm text-slate-500">
            Posted: {formatDate(job.createdAt)}
          </p>
        </div>

        <div className="mt-auto pt-6 flex flex-wrap gap-2">
          <Button asChild variant="secondary">
            <Link href={`/jobs/${job.id}`}>View Details</Link>
          </Button>

          {onJobUpdated &&
            (isClosed ? (
              <Button variant="secondary" disabled>
                Closed
              </Button>
            ) : (
              <CloseJobDialog
                jobTitle={job.title}
                onConfirm={() => onJobUpdated(job)}
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}