"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, BriefcaseBusiness, Wallet, Clock3 } from "lucide-react";
import { toast } from "sonner";

import { registerApi } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
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

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleId: "",
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

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.password.trim()) nextErrors.password = "Password is required.";
    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Confirm password is required.";
    }
    if (!form.roleId) nextErrors.roleId = "Please select an account type.";

    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      await registerApi({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
        roleId: Number(form.roleId),
      });

      toast.success("Account created successfully. Please log in.");
      router.push("/login");
    } catch (error) {
      const responseData = error?.response?.data;

      if (responseData?.errors) {
        const firstError = Object.values(responseData.errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        toast.error(responseData?.message || "Failed to create account.");
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
                Join BridgeSkill
              </p>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Create an account and start your student-friendly journey
              </h1>
              <p className="text-sm leading-7 text-slate-600 md:text-base">
                BridgeSkill is built for all students, including high school,
                university, and beginners who want small flexible jobs to earn
                money and gain real-life experience.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <BenefitCard
                icon={GraduationCap}
                title="For all student levels"
                description="Suitable for high school students, university students, and beginners."
              />
              <BenefitCard
                icon={Wallet}
                title="Earn extra income"
                description="Find practical small jobs that help you earn while studying."
              />
              <BenefitCard
                icon={Clock3}
                title="Flexible opportunities"
                description="Explore part-time, weekend, short-term, and freelance work."
              />
              <BenefitCard
                icon={BriefcaseBusiness}
                title="Useful first experience"
                description="Build confidence and real skills through beginner-friendly jobs."
              />
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Choose the right account
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Student:</span>{" "}
                  For learners who want to find small jobs, earn income, and build skills.
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Client:</span>{" "}
                  For businesses or individuals who want to post flexible jobs for students.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
              <p className="text-sm text-slate-600">
                Register as a student or client to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Full Name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

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
                  placeholder="Enter password"
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  placeholder="Confirm password"
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Account Type</label>
                <select
                  value={form.roleId}
                  onChange={(e) => handleChange("roleId", e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-400"
                >
                  <option value="">Select account type</option>
                  <option value="2">Student</option>
                  <option value="3">Client</option>
                </select>
                {errors.roleId && <p className="text-sm text-red-500">{errors.roleId}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl">
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-slate-900 hover:underline">
                Login here
              </Link>
            </p>
          </section>
        </div>
      </main>
    </GuestOnlyRoute>
  );
}