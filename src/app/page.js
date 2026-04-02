"use client";

import Link from "next/link";
import { BriefcaseBusiness, ShieldCheck, UserRound } from "lucide-react";

import { useAuthStore } from "@/store/auth-store";
import { getDashboardRouteByRole } from "@/lib/auth-redirect";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogoutButton } from "@/components/common/logout-button";

const features = [
  {
    title: "Student Portal",
    description:
      "Browse jobs, build your profile, and submit applications with a clean and simple workflow.",
    icon: UserRound,
  },
  {
    title: "Client Workspace",
    description:
      "Post jobs, review candidates, and update application statuses in one dashboard.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Admin Monitoring",
    description:
      "Track users, jobs, and application activity with a centralized overview.",
    icon: ShieldCheck,
  },
];

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore();

  const dashboardRoute =
    isAuthenticated && user ? getDashboardRouteByRole(user.roleId) : null;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-12">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 rounded-full px-4 py-1 text-sm">
              BridgeSkill Platform
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              A clean job portal built for real backend integration
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              This frontend is designed for students, clients, and admins with a
              modern structure, secure authentication flow, and direct API
              integration.
            </p>

            {isAuthenticated && user ? (
              <p className="mt-4 text-sm font-medium text-slate-700">
                Welcome back, {user.fullName}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {isAuthenticated && user ? (
                <>
                  <Button asChild size="lg" className="min-w-40 rounded-xl">
                    <Link href={dashboardRoute}>Go to Dashboard</Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="min-w-40 rounded-xl"
                  >
                    <Link href="/jobs">Explore Jobs</Link>
                  </Button>

                  <LogoutButton />
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="min-w-36 rounded-xl">
                    <Link href="/login">Login</Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="min-w-36 rounded-xl"
                  >
                    <Link href="/register">Register</Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="min-w-36 rounded-xl"
                  >
                    <Link href="/jobs">Explore Jobs</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="rounded-2xl border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      <Icon className="h-6 w-6 text-slate-700" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm leading-6 text-slate-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}