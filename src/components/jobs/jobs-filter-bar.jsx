"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "OPEN", value: "OPEN" },
  { label: "CLOSED", value: "CLOSED" },
];

export function JobsFilterBar({
  filters,
  onFilterChange,
  onReset,
  categoryOptions = [],
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
      <div className="md:col-span-2">
        <Input
          placeholder="Search by title or keyword"
          value={filters.keyword}
          onChange={(e) => onFilterChange("keyword", e.target.value)}
        />
      </div>

      <div>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none"
        >
          <option value="">All Categories</option>
          {categoryOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none"
        >
          {STATUS_OPTIONS.map((item) => (
            <option key={item.value || "all"} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-4">
        <Button type="button" variant="outline" onClick={onReset} className="rounded-xl">
          Reset
        </Button>
      </div>
    </div>
  );
}