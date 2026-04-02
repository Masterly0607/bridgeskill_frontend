"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ProtectedRoute } from "@/components/common/protected-route";
import { BackButton } from "@/components/common/back-button";
import { PageLoader } from "@/components/common/page-loader";
import { ClientProfileForm } from "@/components/profile/client-profile-form";
import { ROLES } from "@/lib/role";
import {
  getMyClientProfileApi,
  createClientProfileApi,
  updateClientProfileApi,
} from "@/services/client-profile.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EMPTY_PROFILE = {
  companyName: "",
  companyDescription: "",
  phone: "",
};

export default function ClientProfilePage() {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getMyClientProfileApi();
      setProfile(response.data);
      setIsEditMode(true);
    } catch (error) {
      if (error?.response?.status === 404) {
        setProfile(EMPTY_PROFILE);
        setIsEditMode(false);
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

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      if (isEditMode) {
        await updateClientProfileApi(values);
        toast.success("Profile updated successfully");
      } else {
        await createClientProfileApi(values);
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

      toast.error(responseData?.message || "Failed to save client profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <BackButton href="/client/dashboard" label="Back to Dashboard" />

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-slate-900">
                Client Profile
              </CardTitle>
              <p className="text-sm text-slate-600">
                Manage your company profile information.
              </p>
            </CardHeader>

            <CardContent>
              {loading ? (
                <PageLoader />
              ) : (
                <ClientProfileForm
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