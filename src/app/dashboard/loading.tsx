export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Progress skeleton */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <div className="w-[150px] h-[150px] rounded-full bg-white/[0.04] shrink-0" />
        <div className="grid grid-cols-2 gap-3 flex-1 w-full">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06]" />
          ))}
        </div>
      </div>

      {/* Search skeleton */}
      <div className="h-12 rounded-2xl bg-white/[0.02] border border-white/[0.06]" />

      {/* Category skeletons */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/[0.04]" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-40 rounded bg-white/[0.04]" />
              <div className="h-3 w-full rounded bg-white/[0.03]" />
              <div className="h-1.5 w-full rounded-full bg-white/[0.04]" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] last:border-0">
                <div className="w-5 h-5 rounded-md bg-white/[0.04]" />
                <div className="h-4 flex-1 rounded bg-white/[0.03]" />
                <div className="h-5 w-16 rounded-md bg-white/[0.04]" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
