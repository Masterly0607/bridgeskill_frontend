"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { loginApi } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { getDashboardRouteByRole } from "@/lib/auth-redirect";
import { AuthShell } from "@/components/common/auth-shell";
import { GuestRoute } from "@/components/common/guest-route";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await loginApi(values);
      const data = response.data;

      const user = {
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        roleId: data.roleId,
      };

      setAuth({
        token: data.token,
        user,
      });

      toast.success("Login successful");

      router.push(getDashboardRouteByRole(data.roleId));
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";

      toast.error(message);
    }
  };

  return (
    <GuestRoute>
      <AuthShell
        title="Welcome back"
        description="Login to access your dashboard and continue your workflow."
        footer={
          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-slate-900 hover:underline">
              Create one
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </Button>
        </form>
      </AuthShell>
    </GuestRoute>
  );
}