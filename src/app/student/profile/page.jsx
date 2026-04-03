"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GraduationCap, UserRound, Sparkles, Wallet } from "lucide-react";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { PageLoader } from "@/components/common/page-loader";
import { ROLES } from "@/lib/role";
import {
  createStudentProfileApi,
  getMyStudentProfileApi,
  updateStudentProfileApi,
} from "@/services/student-profile.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

export default function StudentProfilePage() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    university: "",
    skills: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getMyStudentProfileApi();
      const profile = response.data;

      setForm({
        fullName: profile?.fullName || "",
        phone: profile?.phone || "",
        university: profile?.university || "",
        skills: profile?.skills || "",
        bio: profile?.bio || "",
      });

      setHasProfile(true);
    } catch (error) {
      if (error?.response?.status === 404) {
        setHasProfile(false);
      } else {
        toast.error(
          error?.response?.data?.message || "Failed to load student profile."
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

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required.";
    if (!form.university.trim()) nextErrors.university = "School or university is required.";
    if (!form.skills.trim()) nextErrors.skills = "Skills are required.";
    if (!form.bio.trim()) nextErrors.bio = "Bio is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      university: form.university.trim(),
      skills: form.skills.trim(),
      bio: form.bio.trim(),
    };

    try {
      setIsSubmitting(true);

      if (hasProfile) {
        await updateStudentProfileApi(payload);
        toast.success("Profile updated successfully");
      } else {
        await createStudentProfileApi(payload);
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
    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <BackButton href="/student/dashboard" label="Back to Dashboard" />

          {loading ? (
            <PageLoader />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
              <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="space-y-4">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    Student Profile
                  </p>
                  <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                    Build a profile that helps you find flexible student jobs
                  </h1>
                  <p className="text-sm leading-7 text-slate-600 md:text-base">
                    This profile is for all students, including high school,
                    university, and beginners who want small jobs, practical
                    experience, and extra income while studying.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <InfoCard
                    icon={UserRound}
                    title="Show who you are"
                    description="Add your name, contact, and a short introduction so clients can understand you better."
                  />
                  <InfoCard
                    icon={GraduationCap}
                    title="Include your education"
                    description="You can write your school, university, or current learning background."
                  />
                  <InfoCard
                    icon={Sparkles}
                    title="Highlight your strengths"
                    description="Add skills, interests, and areas where you can help clients in small practical jobs."
                  />
                  <InfoCard
                    icon={Wallet}
                    title="Improve your chances"
                    description="A complete profile helps you apply faster and look more trustworthy to employers."
                  />
                </div>

                <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Profile tips
                  </h2>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    <p>
                      Write your <span className="font-semibold text-slate-900">school or university</span> clearly.
                    </p>
                    <p>
                      Add skills like communication, tutoring, design, typing,
                      social media, or computer basics.
                    </p>
                    <p>
                      Keep your bio simple and honest. Mention what kind of small
                      jobs you are interested in.
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
                    Complete your profile so clients can know more about you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                      Full Name
                    </label>
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
                    <label className="text-sm font-medium text-slate-900">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                      School or University
                    </label>
                    <input
                      type="text"
                      value={form.university}
                      onChange={(e) => handleChange("university", e.target.value)}
                      placeholder="Enter your school or university"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
                    />
                    {errors.university && (
                      <p className="text-sm text-red-500">{errors.university}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                      Skills
                    </label>
                    <textarea
                      rows={4}
                      value={form.skills}
                      onChange={(e) => handleChange("skills", e.target.value)}
                      placeholder="Example: tutoring, design, typing, communication, social media"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    />
                    {errors.skills && (
                      <p className="text-sm text-red-500">{errors.skills}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                      Short Bio
                    </label>
                    <textarea
                      rows={5}
                      value={form.bio}
                      onChange={(e) => handleChange("bio", e.target.value)}
                      placeholder="Write a short introduction about yourself and the type of work you are looking for."
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    />
                    {errors.bio && (
                      <p className="text-sm text-red-500">{errors.bio}</p>
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