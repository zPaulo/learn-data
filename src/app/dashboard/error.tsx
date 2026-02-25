'use client';

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold text-white mb-4">Algo deu errado</h2>
      <p className="text-gray-400 text-sm mb-8">
        Ocorreu um erro ao carregar o dashboard. Tente novamente.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
      >
        Tentar novamente
      </button>
    </div>
  );
}
