export function formatCurrency(value) {
  if (value === null || value === undefined || value === "") return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value));
}

export function formatDateTime(value) {
  if (!value) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
// Why:

// keep formatting logic out of pages
// reusable for jobs and applications later