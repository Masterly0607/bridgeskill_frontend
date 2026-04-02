"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}