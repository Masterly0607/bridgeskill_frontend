export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          BridgeSkill Frontend
        </h1>
        <p className="text-slate-600 text-lg mb-6">
          Frontend setup is ready. Next steps will connect this app to the real backend.
        </p>
        <div className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
          Step 2 completed
        </div>
      </div>
    </main>
  );
}