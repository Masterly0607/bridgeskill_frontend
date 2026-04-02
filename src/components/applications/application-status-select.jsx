"use client";

const STATUS_OPTIONS = ["PENDING", "REVIEWED", "SHORTLISTED", "REJECTED"];

export function ApplicationStatusSelect({
  value,
  onChange,
  disabled = false,
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none disabled:cursor-not-allowed disabled:opacity-60"
    >
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}