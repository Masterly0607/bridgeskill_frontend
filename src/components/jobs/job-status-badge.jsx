import { Badge } from "@/components/ui/badge";

export function JobStatusBadge({ status }) {
  const normalizedStatus = status || "UNKNOWN";

  const variant =
    normalizedStatus === "OPEN"
      ? "default"
      : normalizedStatus === "CLOSED"
      ? "secondary"
      : "outline";

  return <Badge variant={variant}>{normalizedStatus}</Badge>;
}