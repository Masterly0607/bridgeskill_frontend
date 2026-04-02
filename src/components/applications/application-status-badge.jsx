import { Badge } from "@/components/ui/badge";

const STATUS_VARIANT_MAP = {
  PENDING: "secondary",
  REVIEWED: "outline",
  SHORTLISTED: "default",
  REJECTED: "destructive",
};

export function ApplicationStatusBadge({ status }) {
  const normalizedStatus = status || "PENDING";
  const variant = STATUS_VARIANT_MAP[normalizedStatus] || "secondary";

  return <Badge variant={variant}>{normalizedStatus}</Badge>;
}