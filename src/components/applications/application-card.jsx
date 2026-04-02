import Link from "next/link";
import { BriefcaseBusiness, CalendarDays } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { formatDateTime } from "@/lib/format";

export function ApplicationCard({ application }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <CardTitle className="text-xl text-slate-900">
       {`${application.jobTitle}`}
            </CardTitle>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <BriefcaseBusiness className="h-4 w-4" />
              <span>Job ID: {application.jobId}</span>
            </div>
          </div>

          <ApplicationStatusBadge status={application.status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays className="h-4 w-4" />
          <span>Applied: {formatDateTime(application.appliedAt)}</span>
        </div>

        <Button asChild className="w-full rounded-xl">
          <Link href={`/student/applications/${application.id}`}>
            View Application
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}