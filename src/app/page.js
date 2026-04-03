"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Wallet,
  Clock3,
  Laptop,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JobCard } from "@/components/jobs/job-card";
import { getJobsApi } from "@/services/jobs.service";
import { useAuthStore } from "@/store/auth-store";
import { ROLES } from "@/lib/role";

function SectionCard({ icon: Icon, title, description }) {
  return (
    <Card className="h-full rounded-3xl border border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          <Icon className="h-6 w-6 text-slate-700" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function getDashboardHref(roleId) {
  if (roleId === ROLES.ADMIN) return "/admin/dashboard";
  if (roleId === ROLES.CLIENT) return "/client/dashboard";
  return "/student/dashboard";
}

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getJobsApi();
      setJobs(response.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openJobs = useMemo(() => {
    return jobs.filter((job) => job.status === "OPEN");
  }, [jobs]);

  const beginnerJobs = useMemo(() => {
    return openJobs.filter((job) => job.skillLevel === "BEGINNER").slice(0, 4);
  }, [openJobs]);

  const partTimeJobs = useMemo(() => {
    return openJobs.filter((job) => job.jobType === "PART_TIME").slice(0, 4);
  }, [openJobs]);

  const remoteJobs = useMemo(() => {
    return openJobs.filter((job) => job.workMode === "REMOTE").slice(0, 4);
  }, [openJobs]);

  const featuredJobs = useMemo(() => {
    return openJobs.slice(0, 4);
  }, [openJobs]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                <Sparkles className="h-4 w-4" />
                Small flexible jobs for students
              </div>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                  A student-friendly job platform for earning income and building real skills
                </h1>

                <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                  BridgeSkill is built for all students — including high school,
                  university, and beginners who want small, flexible, and practical
                  jobs to earn some money while studying.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-xl">
                  <Link href="/jobs">
                    Browse Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                {isAuthenticated ? (
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href={getDashboardHref(user?.roleId)}>
                      Go to Dashboard
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href="/register">Create Account</Link>
                  </Button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    For all students
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    High school, university, and beginners are all welcome.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Flexible work
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Part-time, weekend, short-term, and freelance opportunities.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Daily-life value
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Earn extra income while building useful real-world experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <Card className="rounded-3xl border border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      <Wallet className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Earn while studying
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        Find small jobs that help students earn income without needing
                        full-time commitment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      <Clock3 className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Match student schedules
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        Explore part-time, evening, weekend, remote, and short-term
                        jobs that fit student life better.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      <GraduationCap className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Beginner-friendly
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        Many opportunities are suitable even for students with limited
                        work experience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">
              Why BridgeSkill is different
            </h2>
            <p className="text-sm text-slate-600">
              It is not a general job board. It is built around real student needs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <SectionCard
              icon={BriefcaseBusiness}
              title="Small jobs, not only big careers"
              description="BridgeSkill focuses on practical small jobs that students can actually do while still studying."
            />
            <SectionCard
              icon={Laptop}
              title="Flexible and modern work styles"
              description="Students can explore onsite, remote, and hybrid jobs based on what fits their daily routine."
            />
            <SectionCard
              icon={GraduationCap}
              title="Inclusive for all student levels"
              description="The platform is designed for high school students, university students, and other beginners who want to start earning."
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 md:px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Featured student-friendly jobs
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Quick opportunities that fit flexible student life.
              </p>
            </div>

            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/jobs">View All Jobs</Link>
            </Button>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
              Loading jobs...
            </div>
          ) : featuredJobs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-sm">
              No open jobs available right now.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-12 md:px-6">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900">
                Beginner Jobs
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Good starting opportunities for students with little or no experience.
              </p>
              <p className="mt-4 text-sm font-medium text-slate-900">
                {beginnerJobs.length} job(s) available
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900">
                Part-Time Jobs
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Flexible jobs that students can balance with study schedules.
              </p>
              <p className="mt-4 text-sm font-medium text-slate-900">
                {partTimeJobs.length} job(s) available
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900">
                Remote Jobs
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Convenient jobs students can do from home or from anywhere.
              </p>
              <p className="mt-4 text-sm font-medium text-slate-900">
                {remoteJobs.length} job(s) available
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Start small. Grow skills. Earn money.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  BridgeSkill helps students take practical first steps into work
                  through flexible jobs that are useful in real daily life.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-xl">
                  <Link href="/jobs">Explore Jobs</Link>
                </Button>

                {isAuthenticated ? (
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href={getDashboardHref(user?.roleId)}>
                      Go to Dashboard
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href="/register">Join BridgeSkill</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}