import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { formatDateTime } from "@/lib/format";

export function ClientApplicationCard({ application, jobId }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-xl text-slate-900">
              Student #{application.studentId}
            </CardTitle>
            <p className="mt-2 text-sm text-slate-500">
              Applied: {formatDateTime(application.createdAt)}
            </p>
          </div>

          <ApplicationStatusBadge status={application.status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
          {application.coverLetter || "No cover letter provided."}
        </p>

        <Button asChild className="rounded-xl">
          <Link href={`/client/jobs/${jobId}/applications/${application.id}`}>
            View Application
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}