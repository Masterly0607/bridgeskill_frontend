"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const JOB_TYPE_OPTIONS = [
  { label: "Select job type", value: "" },
  { label: "Part-Time", value: "PART_TIME" },
  { label: "Weekend", value: "WEEKEND" },
  { label: "Short-Term", value: "SHORT_TERM" },
  { label: "Freelance", value: "FREELANCE" },
];

const SKILL_LEVEL_OPTIONS = [
  { label: "Select skill level", value: "" },
  { label: "Beginner", value: "BEGINNER" },
  { label: "Intermediate", value: "INTERMEDIATE" },
];

const WORK_MODE_OPTIONS = [
  { label: "Select work mode", value: "" },
  { label: "Onsite", value: "ONSITE" },
  { label: "Remote", value: "REMOTE" },
  { label: "Hybrid", value: "HYBRID" },
];

function buildFormValues(values = {}) {
  return {
    title: values?.title ?? "",
    description: values?.description ?? "",
    category: values?.category ?? "",
    location: values?.location ?? "",
    salary:
      values?.salary !== null && values?.salary !== undefined
        ? String(values.salary)
        : "",
    jobType: values?.jobType ?? "",
    skillLevel: values?.skillLevel ?? "",
    workMode: values?.workMode ?? "",
  };
}

export default function JobForm({
  initialValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save Job",
}) {
  const initialForm = useMemo(() => buildFormValues(initialValues), [initialValues]);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

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

    if (!form.title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    if (!form.category.trim()) {
      nextErrors.category = "Category is required.";
    }

    if (!form.location.trim()) {
      nextErrors.location = "Location is required.";
    }

    if (!String(form.salary).trim()) {
      nextErrors.salary = "Salary is required.";
    } else if (Number(form.salary) < 0) {
      nextErrors.salary = "Salary must be 0 or greater.";
    }

    if (!form.jobType) {
      nextErrors.jobType = "Job type is required.";
    }

    if (!form.skillLevel) {
      nextErrors.skillLevel = "Skill level is required.";
    }

    if (!form.workMode) {
      nextErrors.workMode = "Work mode is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      location: form.location.trim(),
      salary: Number(form.salary),
      jobType: form.jobType,
      skillLevel: form.skillLevel,
      workMode: form.workMode,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Job Title</label>
        <Input
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter job title"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter job description"
          rows={5}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Input
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="Enter category"
          />
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Salary</label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={form.salary}
            onChange={(e) => handleChange("salary", e.target.value)}
            placeholder="Enter salary"
          />
          {errors.salary && <p className="text-sm text-red-500">{errors.salary}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Job Type</label>
          <select
            value={form.jobType}
            onChange={(e) => handleChange("jobType", e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
          >
            {JOB_TYPE_OPTIONS.map((option) => (
              <option key={option.value || "empty-job-type"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.jobType && (
            <p className="text-sm text-red-500">{errors.jobType}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Skill Level</label>
          <select
            value={form.skillLevel}
            onChange={(e) => handleChange("skillLevel", e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
          >
            {SKILL_LEVEL_OPTIONS.map((option) => (
              <option key={option.value || "empty-skill-level"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.skillLevel && (
            <p className="text-sm text-red-500">{errors.skillLevel}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Work Mode</label>
          <select
            value={form.workMode}
            onChange={(e) => handleChange("workMode", e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
          >
            {WORK_MODE_OPTIONS.map((option) => (
              <option key={option.value || "empty-work-mode"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.workMode && (
            <p className="text-sm text-red-500">{errors.workMode}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}