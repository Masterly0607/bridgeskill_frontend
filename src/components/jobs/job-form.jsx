"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function JobForm({
  initialValues,
  onSubmit,
  isSubmitting,
  submitLabel,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      salary: "",
      status: "OPEN",
    },
  });

  useEffect(() => {
    reset({
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      category: initialValues?.category || "",
      location: initialValues?.location || "",
      salary:
        initialValues?.salary !== undefined && initialValues?.salary !== null
          ? String(initialValues.salary)
          : "",
      status: initialValues?.status || "OPEN",
    });
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            placeholder="Enter job title"
            {...register("title", {
              required: "Job title is required",
            })}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter job description"
            rows={6}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="Enter category"
            {...register("category", {
              required: "Category is required",
            })}
          />
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Enter location"
            {...register("location", {
              required: "Location is required",
            })}
          />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Salary</Label>
          <Input
            id="salary"
            type="number"
            step="0.01"
            placeholder="Enter salary"
            {...register("salary", {
              required: "Salary is required",
            })}
          />
          {errors.salary && (
            <p className="text-sm text-red-500">{errors.salary.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none"
            {...register("status", {
              required: "Status is required",
            })}
          >
            <option value="OPEN">OPEN</option>
            <option value="CLOSED">CLOSED</option>
          </select>
          {errors.status && (
            <p className="text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-2 rounded-xl px-6" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}