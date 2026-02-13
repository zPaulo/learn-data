import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/10 flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-blue-400/60" />
          </div>
        </div>

        <h1 className="text-7xl font-extrabold bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent mb-3">
          404
        </h1>
        <p className="text-gray-400 text-base mb-2">Pagina nao encontrada</p>
        <p className="text-gray-600 text-sm mb-8 max-w-xs mx-auto">
          A pagina que voce esta procurando nao existe ou foi movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-[0.98]"
        >
          Voltar ao inicio
        </Link>
      </div>
    </div>
  );
}
