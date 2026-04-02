"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function StudentProfileForm({
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
      phone: "",
      university: "",
      skills: "",
      bio: "",
    },
  });

  useEffect(() => {
    reset({
      phone: initialValues.phone || "",
      university: initialValues.university || "",
      skills: initialValues.skills || "",
      bio: initialValues.bio || "",
    });
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            {...register("phone", {
              required: "Phone is required",
            })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="university">University</Label>
          <Input
            id="university"
            placeholder="Enter your university"
            {...register("university", {
              required: "University is required",
            })}
          />
          {errors.university && (
            <p className="text-sm text-red-500">{errors.university.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            placeholder="Example: Java, Spring Boot, JWT"
            {...register("skills", {
              required: "Skills are required",
            })}
          />
          {errors.skills && (
            <p className="text-sm text-red-500">{errors.skills.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Write a short introduction about yourself"
            rows={5}
            {...register("bio", {
              required: "Bio is required",
            })}
          />
          {errors.bio && (
            <p className="text-sm text-red-500">{errors.bio.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="rounded-xl" disabled={isSubmitting}>
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