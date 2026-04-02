import Link from "next/link";
import { MapPin, BriefcaseBusiness, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobStatusBadge } from "@/components/jobs/job-status-badge";
import { formatCurrency, formatDateTime } from "@/lib/format";

export function JobCard({ job }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <CardTitle className="text-xl text-slate-900">{job.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <BriefcaseBusiness className="h-4 w-4" />
                {job.category || "Uncategorized"}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location || "Not specified"}
              </span>
            </div>
          </div>

          <JobStatusBadge status={job.status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
          {job.description || "No description available."}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1">
            <Wallet className="h-4 w-4" />
            {formatCurrency(job.salary)}
          </span>

          <span>Posted: {formatDateTime(job.createdAt)}</span>
        </div>

        <Button asChild className="w-full rounded-xl">
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}