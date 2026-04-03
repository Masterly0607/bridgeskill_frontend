"use client";

import Link from "next/link";
import {
  UserRound,
  FileText,
  BriefcaseBusiness,
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

export default function StudentDashboardPage() {
  const { user } = useAuthStore();

  return (
    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Student Portal
                </p>
                <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                  Welcome back{user?.fullName ? `, ${user.fullName}` : ""}
                </h1>
                <p className="max-w-2xl text-slate-600">
                  Manage your profile, track your applications, and discover job
                  opportunities from one place.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-xl">
                  <Link href="/jobs">Browse Jobs</Link>
                </Button>

                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/student/applications">My Applications</Link>
                </Button>

                <LogoutButton variant="secondary" className="rounded-xl border-0" />
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <DashboardActionCard
              icon={UserRound}
              title="My Profile"
              description="Keep your profile complete so employers can understand your skills, university, and background."
              href="/student/profile"
              actionLabel="Manage Profile"
            />

            <DashboardActionCard
              icon={FileText}
              title="My Applications"
              description="Review the jobs you have applied for and check the latest status of each application."
              href="/student/applications"
              actionLabel="View Applications"
            />

            <DashboardActionCard
              icon={BriefcaseBusiness}
              title="Explore Jobs"
              description="Browse available jobs and apply for positions that match your interests and profile."
              href="/jobs"
              actionLabel="Browse Jobs"
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
                      A simple path to use BridgeSkill effectively.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">
                      1. Complete profile
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Add your phone, university, skills, and bio first.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">
                      2. Apply to jobs
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Explore open roles and submit a clear cover letter.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">
                      3. Track progress
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Revisit your application page to see status changes.
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
                    "Keep your profile updated before applying.",
                    "Write a personal cover letter for each job.",
                    "Check your application status regularly.",
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