"use client";

const JOB_TYPE_OPTIONS = [
  { label: "All job types", value: "" },
  { label: "Part-Time", value: "PART_TIME" },
  { label: "Weekend", value: "WEEKEND" },
  { label: "Short-Term", value: "SHORT_TERM" },
  { label: "Freelance", value: "FREELANCE" },
];

const SKILL_LEVEL_OPTIONS = [
  { label: "All skill levels", value: "" },
  { label: "Beginner", value: "BEGINNER" },
  { label: "Intermediate", value: "INTERMEDIATE" },
];

const WORK_MODE_OPTIONS = [
  { label: "All work modes", value: "" },
  { label: "Onsite", value: "ONSITE" },
  { label: "Remote", value: "REMOTE" },
  { label: "Hybrid", value: "HYBRID" },
];

export function JobsFilterBar({ filters, onChange, onReset }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Search</label>
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) => onChange("keyword", e.target.value)}
            placeholder="Search by title"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Category</label>
          <input
            type="text"
            value={filters.category}
            onChange={(e) => onChange("category", e.target.value)}
            placeholder="Filter by category"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Job Type</label>
          <select
            value={filters.jobType}
            onChange={(e) => onChange("jobType", e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-400"
          >
            {JOB_TYPE_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Skill Level</label>
          <select
            value={filters.skillLevel}
            onChange={(e) => onChange("skillLevel", e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-400"
          >
            {SKILL_LEVEL_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Work Mode</label>
          <select
            value={filters.workMode}
            onChange={(e) => onChange("workMode", e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-400"
          >
            {WORK_MODE_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}