"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ClientProfileForm({
  initialValues,
  onSubmit,
  isSubmitting,
  isEditMode,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      companyDescription: "",
      phone: "",
    },
  });

  useEffect(() => {
    reset({
      companyName: initialValues?.companyName || "",
      companyDescription: initialValues?.companyDescription || "",
      phone: initialValues?.phone || "",
    });
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            placeholder="Enter company name"
            {...register("companyName", {
              required: "Company name is required",
            })}
          />
          {errors.companyName && (
            <p className="text-sm text-red-500">{errors.companyName.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="companyDescription">Company Description</Label>
          <Textarea
            id="companyDescription"
            placeholder="Describe your company"
            rows={5}
            {...register("companyDescription", {
              required: "Company description is required",
            })}
          />
          {errors.companyDescription && (
            <p className="text-sm text-red-500">
              {errors.companyDescription.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Enter company phone"
            {...register("phone", {
              required: "Phone is required",
            })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="rounded-xl px-6" disabled={isSubmitting}>
        {isSubmitting
          ? isEditMode
            ? "Updating..."
            : "Creating..."
          : isEditMode
          ? "Update Profile"
          : "Create Profile"}
      </Button>
    </form>
  );
}