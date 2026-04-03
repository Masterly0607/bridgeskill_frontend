import { Loader2 } from "lucide-react";

export function PageLoader({
  title = "Loading...",
  description = "Please wait while we prepare the page.",
}) {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
          <Loader2 className="h-6 w-6 animate-spin text-slate-700" />
        </div>

        <h2 className="mt-5 text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}