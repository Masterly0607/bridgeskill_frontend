import Link from "next/link";
import {
  CalendarDays,
  Sparkles,
  Clock3,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { formatDateTime } from "@/lib/format";

function getReviewHint(status) {
  switch (status) {
    case "PENDING":
      return {
        icon: Clock3,
        text: "Waiting for your review",
      };
    case "REVIEWED":
      return {
        icon: Eye,
        text: "Already reviewed",
      };
    case "SHORTLISTED":
      return {
        icon: CheckCircle2,
        text: "Moved to next stage",
      };
    case "REJECTED":
      return {
        icon: XCircle,
        text: "Not selected",
      };
    default:
      return {
        icon: Sparkles,
        text: "Applicant review",
      };
  }
}

export function ClientApplicationCard({ application, jobId }) {
  const hint = getReviewHint(application.status);
  const HintIcon = hint.icon;

  return (
    <Card className="h-full rounded-2xl border-slate-200 shadow-sm transition hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              <HintIcon className="h-3.5 w-3.5" />
              <span>{hint.text}</span>
            </div>

            <CardTitle className="text-xl text-slate-900">
              Applicant
            </CardTitle>
          </div>

          <ApplicationStatusBadge status={application.status} />
        </div>
      </CardHeader>

      <CardContent className="flex h-full flex-col space-y-5">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays className="h-4 w-4" />
          <span>Applied: {formatDateTime(application.appliedAt)}</span>
        </div>

        <p className="line-clamp-3 text-sm leading-7 text-slate-600">
          {application.coverLetter || "No cover letter provided."}
        </p>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            Review note
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {application.status === "PENDING"
              ? "Open this application to review the student profile and decide the next step."
              : application.status === "SHORTLISTED"
              ? "This applicant has already been moved forward. Recheck details if needed."
              : application.status === "REJECTED"
              ? "This applicant was not selected. You can still reopen the detail for reference."
              : "This application has been reviewed. You may update the decision again if needed."}
          </p>
        </div>

        <div className="mt-auto">
          <Button asChild className="rounded-xl">
            <Link href={`/client/jobs/${jobId}/applications/${application.id}`}>
              View Application
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}