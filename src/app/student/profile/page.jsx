"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { PageLoader } from "@/components/common/page-loader";
import { StudentProfileForm } from "@/components/profile/student-profile-form";
import { ROLES } from "@/lib/role";
import {
  getMyStudentProfileApi,
  createStudentProfileApi,
  updateStudentProfileApi,
} from "@/services/student-profile.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EMPTY_PROFILE = {
  phone: "",
  university: "",
  skills: "",
  bio: "",
};
export default function StudentProfilePage() {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getMyStudentProfileApi();
      setProfile(response.data);
      setIsEditMode(true);
    } catch (error) {
      if (error?.response?.status === 404) {
        setProfile(EMPTY_PROFILE);
        setIsEditMode(false);
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

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      if (isEditMode) {
        await updateStudentProfileApi(values);
        toast.success("Profile updated successfully");
      } else {
        await createStudentProfileApi(values);
        toast.success("Profile created successfully");
      }

      await fetchProfile();
    } catch (error) {
      const responseData = error?.response?.data;

      if (responseData?.errors) {
        const firstError = Object.values(responseData.errors)[0];
        toast.error(firstError);
        return;
      }

      toast.error(
        responseData?.message || "Failed to save student profile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-slate-900">
                Student Profile
              </CardTitle>
              <p className="text-sm text-slate-600">
                Complete your student profile to prepare for job applications.
              </p>
            </CardHeader>

            <CardContent>
              {loading ? (
                <PageLoader />
              ) : (
                <StudentProfileForm
                  initialValues={profile}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  isEditMode={isEditMode}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </ProtectedRoute>
  );
}