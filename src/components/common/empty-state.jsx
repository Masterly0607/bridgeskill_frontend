import { Inbox } from "lucide-react";

export function EmptyState({
  title = "Nothing here yet",
  description = "There is no data to show right now.",
  action,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <Inbox className="h-6 w-6 text-slate-700" />
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
        {description}
      </p>

      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}