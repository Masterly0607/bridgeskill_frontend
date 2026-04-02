import { Card, CardContent } from "@/components/ui/card";

export function SummaryCard({ title, value }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
      </CardContent>
    </Card>
  );
}