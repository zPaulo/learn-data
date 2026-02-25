import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-gray-400 text-lg mb-8">Página não encontrada</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
