"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Building2, Users, Sparkles, BriefcaseBusiness } from "lucide-react";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { PageLoader } from "@/components/common/page-loader";
import { ROLES } from "@/lib/role";
import {
  createClientProfileApi,
  getMyClientProfileApi,
  updateClientProfileApi,
} from "@/services/client-profile.service";
import { Button } from "@/components/ui/button";

function InfoCard({ icon: Icon, title, description }) {
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

export default function ClientProfilePage() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    companyDescription: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getMyClientProfileApi();
      const profile = response.data;

      setForm({
        companyName: profile?.companyName || "",
        companyDescription: profile?.companyDescription || "",
        phone: profile?.phone || "",
      });

      setHasProfile(true);
    } catch (error) {
      if (error?.response?.status === 404) {
        setHasProfile(false);
      } else {
        toast.error(
          error?.response?.data?.message || "Failed to load client profile."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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

    if (!form.companyName.trim()) {
      nextErrors.companyName = "Company name is required.";
    }

    if (!form.companyDescription.trim()) {
      nextErrors.companyDescription = "Company description is required.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      companyName: form.companyName.trim(),
      companyDescription: form.companyDescription.trim(),
      phone: form.phone.trim(),
    };

    try {
      setIsSubmitting(true);

      if (hasProfile) {
        await updateClientProfileApi(payload);
        toast.success("Profile updated successfully");
      } else {
        await createClientProfileApi(payload);
        toast.success("Profile created successfully");
        setHasProfile(true);
      }
    } catch (error) {
      const responseData = error?.response?.data;

      if (responseData?.errors) {
        const firstError = Object.values(responseData.errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        toast.error(responseData?.message || "Failed to save profile.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <BackButton href="/client/dashboard" label="Back to Dashboard" />

          {loading ? (
            <PageLoader />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
              <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="space-y-4">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    Client Profile
                  </p>
                  <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                    Create a profile to hire students for flexible small jobs
                  </h1>
                  <p className="text-sm leading-7 text-slate-600 md:text-base">
                    BridgeSkill helps clients connect with students of different
                    levels, including high school, university, and beginners who
                    are looking for practical small-job opportunities.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <InfoCard
                    icon={Building2}
                    title="Show your organization clearly"
                    description="Add a clear company name and description so students can trust and understand your opportunity."
                  />
                  <InfoCard
                    icon={Users}
                    title="Reach different student levels"
                    description="Your jobs can be suitable for high school students, university students, and beginners."
                  />
                  <InfoCard
                    icon={BriefcaseBusiness}
                    title="Post practical small jobs"
                    description="Use BridgeSkill for part-time, weekend, short-term, remote, or beginner-friendly student jobs."
                  />
                  <InfoCard
                    icon={Sparkles}
                    title="Attract better applicants"
                    description="A complete client profile helps students feel more confident when applying."
                  />
                </div>

                <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Good client profile tips
                  </h2>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    <p>
                      Explain what your company or project does in a simple way.
                    </p>
                    <p>
                      Mention the type of students you are willing to work with,
                      especially if the job is beginner-friendly.
                    </p>
                    <p>
                      Clear and trustworthy profile details can improve the quality
                      of student applications.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {hasProfile ? "Update Profile" : "Create Profile"}
                  </h2>
                  <p className="text-sm text-slate-600">
                    Complete your profile so students can know more about you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      placeholder="Enter company name"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-500">{errors.companyName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                      Company Description
                    </label>
                    <textarea
                      rows={5}
                      value={form.companyDescription}
                      onChange={(e) =>
                        handleChange("companyDescription", e.target.value)
                      }
                      placeholder="Describe your company and the kind of student opportunities you offer."
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    />
                    {errors.companyDescription && (
                      <p className="text-sm text-red-500">
                        {errors.companyDescription}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Enter contact phone number"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl"
                  >
                    {isSubmitting
                      ? hasProfile
                        ? "Updating..."
                        : "Creating..."
                      : hasProfile
                      ? "Update Profile"
                      : "Create Profile"}
                  </Button>
                </form>
              </section>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}