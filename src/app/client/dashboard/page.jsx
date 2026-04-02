"use client";

import Link from "next/link";
import {
  Building2,
  BriefcaseBusiness,
  FileText,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

import { ProtectedRoute } from "@/components/common/protected-route";
import { LogoutButton } from "@/components/common/logout-button";
import { ROLES } from "@/lib/role";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ClientDashboardPage() {
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
                  Client Dashboard
                </h1>
                <p className="max-w-2xl text-slate-600">
                  Manage your company profile, post job opportunities, and track
                  applications from students.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-xl">
                  <Link href="/client/profile">Manage Profile</Link>
                </Button>

                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/client/jobs">Manage Jobs</Link>
                </Button>

                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/client/jobs/create">Post Job</Link>
                </Button>

                <LogoutButton variant="secondary" className="rounded-xl border-0" />
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <Building2 className="h-6 w-6 text-slate-700" />
                </div>

                <h2 className="text-xl font-semibold text-slate-900">
                  Company Profile
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Update your company information so students can understand
                  your organization better.
                </p>

                <Button asChild variant="link" className="mt-4 px-0 text-slate-900">
                  <Link href="/client/profile">
                    Go to Profile
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
                  Manage Jobs
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Review, edit, and close your posted jobs in one place.
                </p>

                <Button asChild variant="link" className="mt-4 px-0 text-slate-900">
                  <Link href="/client/jobs">
                    View Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <PlusCircle className="h-6 w-6 text-slate-700" />
                </div>

                <h2 className="text-xl font-semibold text-slate-900">
                  Post a Job
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Create a new job opportunity and make it visible to students.
                </p>

                <Button asChild variant="link" className="mt-4 px-0 text-slate-900">
                  <Link href="/client/jobs/create">
                    Create Job
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
                  Applications
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Review student applications submitted for your jobs.
                </p>

                <Button asChild variant="link" className="mt-4 px-0 text-slate-900">
                  <Link href="/client/applications">
                    View Applications
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
                  Keep your profile updated
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A complete company profile builds trust with student applicants.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  Write clear job posts
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Clear job titles and descriptions help attract better candidates.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  Review applications regularly
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Checking applications often helps you respond faster to students.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}