'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
        <AlertTriangle className="w-7 h-7 text-red-400" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">Algo deu errado</h2>
      <p className="text-gray-400 text-sm mb-6 text-center max-w-sm">
        Ocorreu um erro inesperado ao carregar o dashboard. Tente novamente.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all cursor-pointer active:scale-[0.98]"
      >
        <RefreshCw className="w-4 h-4" />
        Tentar novamente
      </button>
    </div>
  );
}
