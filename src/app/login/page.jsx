"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, BriefcaseBusiness, Wallet, Clock3 } from "lucide-react";
import { toast } from "sonner";

import { loginApi, meApi } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { ROLES } from "@/lib/role";
import { GuestOnlyRoute } from "@/components/common/guest-only-route";

function BenefitCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
        <Icon className="h-5 w-5 text-slate-700" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.password.trim()) nextErrors.password = "Password is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const redirectByRole = (roleId) => {
    if (roleId === ROLES.ADMIN) {
      router.push("/admin/dashboard");
      return;
    }

    if (roleId === ROLES.CLIENT) {
      router.push("/client/dashboard");
      return;
    }

    router.push("/student/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const loginResponse = await loginApi({
        email: form.email.trim(),
        password: form.password,
      });

      const token = loginResponse?.data?.token;

      if (!token) {
        toast.error("Login failed. Token not received.");
        return;
      }

      const meResponse = await meApi({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = meResponse.data;

      setAuth({
        token,
        user,
      });

      toast.success("Login successful");
      redirectByRole(user?.roleId);
    } catch (error) {
      const responseData = error?.response?.data;

      if (responseData?.errors) {
        const firstError = Object.values(responseData.errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        toast.error(responseData?.message || "Invalid email or password.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GuestOnlyRoute>
      <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.95fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Welcome back
              </p>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Login to BridgeSkill and continue your journey
              </h1>
              <p className="text-sm leading-7 text-slate-600 md:text-base">
                BridgeSkill is designed for all students, including high school,
                university, and beginners who want flexible small jobs to earn
                income and build practical experience.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <BenefitCard
                icon={GraduationCap}
                title="For all students"
                description="Suitable for high school students, university students, and other beginners."
              />
              <BenefitCard
                icon={Wallet}
                title="Earn while studying"
                description="Find student-friendly jobs that help you earn extra money."
              />
              <BenefitCard
                icon={Clock3}
                title="Flexible opportunities"
                description="Explore part-time, weekend, short-term, and freelance work."
              />
              <BenefitCard
                icon={BriefcaseBusiness}
                title="For clients too"
                description="Clients can post small flexible jobs that better fit student life."
              />
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Who can use BridgeSkill?
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Students:</span>{" "}
                  Find flexible, beginner-friendly jobs to earn money and gain experience.
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Clients:</span>{" "}
                  Post jobs that are suitable for students and easier to manage.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Login</h2>
              <p className="text-sm text-slate-600">
                Sign in to browse jobs, apply, or manage job opportunities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-slate-900 hover:underline">
                Create one here
              </Link>
            </p>
          </section>
        </div>
      </main>
    </GuestOnlyRoute>
  );
}