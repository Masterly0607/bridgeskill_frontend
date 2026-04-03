"use client";

import Link from "next/link";
import {
  Building2,
  BriefcaseBusiness,
  FileText,
  PlusCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { ProtectedRoute } from "@/components/common/protected-route";
import { LogoutButton } from "@/components/common/logout-button";
import { ROLES } from "@/lib/role";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";

function DashboardActionCard({ icon, title, description, href, actionLabel }) {
  const Icon = icon;

  return (
    <Card className="h-full rounded-3xl border border-slate-200 shadow-sm">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          <Icon className="h-6 w-6 text-slate-700" />
        </div>

        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm leading-8 text-slate-600">{description}</p>

        <div className="mt-auto pt-6">
          <Button asChild variant="link" className="px-0 text-slate-900">
            <Link href={href}>
              {actionLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ClientDashboardPage() {
  const { user } = useAuthStore();

  return (
    <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Client Portal
                </p>
                <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                  Welcome back{user?.fullName ? `, ${user.fullName}` : ""}
                </h1>
                <p className="max-w-2xl text-slate-600">
                  Manage your company profile, post jobs, and review student
                  applications with a cleaner workflow.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-xl">
                  <Link href="/client/jobs/new">Post a Job</Link>
                </Button>

                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/client/jobs">Manage Jobs</Link>
                </Button>

                <LogoutButton variant="secondary" className="rounded-xl border-0" />
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DashboardActionCard
              icon={Building2}
              title="Company Profile"
              description="Update your company details so students can better understand your organization."
              href="/client/profile"
              actionLabel="Manage Profile"
            />

            <DashboardActionCard
              icon={BriefcaseBusiness}
              title="Manage Jobs"
              description="View all your posted jobs, open details, and review applicants for each position."
              href="/client/jobs"
              actionLabel="View Jobs"
            />

            <DashboardActionCard
              icon={PlusCircle}
              title="Post a Job"
              description="Create a new opportunity and publish it for students to apply."
              href="/client/jobs/new"
              actionLabel="Create Job"
            />

            <DashboardActionCard
              icon={FileText}
              title="Review Applicants"
              description="Open a job and review the students who submitted applications."
              href="/client/jobs"
              actionLabel="Go to My Jobs"
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                    <Sparkles className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Recommended flow
                    </h2>
                    <p className="text-sm text-slate-600">
                      A simple process for using the client portal well.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">
                      1. Update company profile
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Make your company clear and trustworthy before posting.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">
                      2. Post job opportunities
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Create clear job titles, descriptions, and requirements.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">
                      3. Review applicants
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Check cover letters and update statuses regularly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Quick reminders
                </h2>

                <div className="mt-5 space-y-4">
                  {[
                    "Complete your company profile before posting jobs.",
                    "Use clear job descriptions to attract better applicants.",
                    "Review applications often and update status clearly.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-slate-700" />
                      <p className="text-sm leading-6 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}