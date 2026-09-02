export function PageLoadingState() {
  return (
    <main className="min-h-[70vh] bg-white pt-32 dark:bg-[#080E1D]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="h-8 w-40 animate-pulse rounded-full bg-slate-100 dark:bg-white/10" />
        <div className="mt-8 h-14 max-w-2xl animate-pulse rounded-lg bg-slate-100 dark:bg-white/10" />
        <div className="mt-4 h-14 max-w-xl animate-pulse rounded-lg bg-slate-100 dark:bg-white/10" />
        <div className="mt-8 h-4 max-w-3xl animate-pulse rounded bg-slate-100 dark:bg-white/10" />
        <div className="mt-3 h-4 max-w-2xl animate-pulse rounded bg-slate-100 dark:bg-white/10" />
      </div>
    </main>
  );
}
