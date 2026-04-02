"use client";

import Link from "next/link";
import { UserRound, FileText, BriefcaseBusiness, ArrowRight } from "lucide-react";

import { ProtectedRoute } from "@/components/common/protected-route";
import { LogoutButton } from "@/components/common/logout-button";
import { ROLES } from "@/lib/role";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Student Portal
                </p>
                <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                  Student Dashboard
                </h1>
                <p className="max-w-2xl text-slate-600">
                  Manage your profile, track your job applications, and explore
                  new opportunities from one place.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-xl">
                  <Link href="/student/profile">Manage Profile</Link>
                </Button>

                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/student/applications">My Applications</Link>
                </Button>

                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/jobs">Browse Jobs</Link>
                </Button>

                <LogoutButton />
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <UserRound className="h-6 w-6 text-slate-700" />
                </div>

                <h2 className="text-xl font-semibold text-slate-900">
                  My Profile
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Keep your student information updated so employers can review
                  your background properly.
                </p>

                <Button asChild variant="link" className="mt-4 px-0 text-slate-900">
                  <Link href="/student/profile">
                    Go to Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <FileText className="h-6 w-6 text-slate-700" />
                </div>

                <h2 className="text-xl font-semibold text-slate-900">
                  My Applications
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Review the jobs you have applied for and check their latest
                  application status.
                </p>

                <Button asChild variant="link" className="mt-4 px-0 text-slate-900">
                  <Link href="/student/applications">
                    View Applications
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <BriefcaseBusiness className="h-6 w-6 text-slate-700" />
                </div>

                <h2 className="text-xl font-semibold text-slate-900">
                  Browse Jobs
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Explore available jobs, open job details, and apply for roles
                  that match your interests.
                </p>

                <Button asChild variant="link" className="mt-4 px-0 text-slate-900">
                  <Link href="/jobs">
                    Explore Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              Quick Tips
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  Complete your profile
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A complete profile helps clients understand your skills and
                  background.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  Track your applications
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Check your applications regularly to stay updated on progress.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  Apply to open jobs
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Focus on open positions that match your interests and profile.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}