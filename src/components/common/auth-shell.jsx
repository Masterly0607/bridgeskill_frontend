import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function AuthShell({ title, description, children, footer }) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-2">
          <div className="hidden rounded-3xl bg-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <BriefcaseBusiness className="h-7 w-7" />
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                BridgeSkill
              </h1>

              <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
                A modern job portal connecting students, clients, and admins through a secure and role-based system.
              </p>
            </div>

            <div className="text-sm text-slate-400">
              Built for real backend integration and presentation-ready workflow.
            </div>
          </div>

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader className="space-y-2">
              <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                ← Back to home
              </Link>
              <CardTitle className="text-3xl">{title}</CardTitle>
              <CardDescription className="text-base">{description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {children}
              {footer}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
// Why:

// gives login/register a professional shared layout
// keeps design consistent
// easier to maintain