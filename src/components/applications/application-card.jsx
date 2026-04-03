import Link from "next/link";
import { CalendarDays, Sparkles, CheckCircle2, Clock3, XCircle, Eye } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge";
import { formatDateTime } from "@/lib/format";

function getApplicationHint(status) {
  switch (status) {
    case "PENDING":
      return {
        icon: Clock3,
        text: "Waiting for employer review",
      };
    case "REVIEWED":
      return {
        icon: Eye,
        text: "Employer has reviewed your application",
      };
    case "SHORTLISTED":
      return {
        icon: CheckCircle2,
        text: "Good news — you moved to the next stage",
      };
    case "REJECTED":
      return {
        icon: XCircle,
        text: "Keep going — try other student-friendly jobs too",
      };
    default:
      return {
        icon: Sparkles,
        text: "Track your progress here",
      };
  }
}

export function ApplicationCard({ application }) {
  const hint = getApplicationHint(application.status);
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
              {application.jobTitle || "Job Application"}
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

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            Student tip
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {application.status === "SHORTLISTED"
              ? "Prepare yourself for the next step and review the original job details again."
              : application.status === "REJECTED"
              ? "Do not worry — use what you learned and keep applying to other flexible jobs."
              : "Keep checking your application progress and stay ready for updates from the employer."}
          </p>
        </div>

        <div className="mt-auto">
          <Button asChild className="w-full rounded-xl">
            <Link href={`/student/applications/${application.id}`}>
              View Application
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}