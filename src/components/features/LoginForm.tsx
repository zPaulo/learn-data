'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Sparkles, Cloud, HardDrive, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'cloud' | 'local'>('cloud');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginLocal, loginWithDb } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setError('');

    if (mode === 'local') {
      loginLocal(name.trim());
      onLogin();
      return;
    }

    // Cloud mode
    if (!password.trim()) {
      setError('Digite uma senha para o modo nuvem.');
      return;
    }

    setLoading(true);
    try {
      const endpoint = authMode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao autenticar.');
        setLoading(false);
        return;
      }

      loginWithDb({
        username: data.username,
        createdAt: data.createdAt,
        completedSkills: data.completedSkills || [],
        completedProjects: data.completedProjects || [],
      });
      onLogin();
    } catch {
      setError('Erro de conexão. Tente o modo local.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-500/20">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 gradient-text">
              Trilha Data Analyst
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Seu roadmap interativo do zero ao Analista de Dados Junior.
            Acompanhe seu progresso e conquiste cada habilidade.
          </motion.p>
        </div>

        {/* Features */}
        <motion.div
          className="flex justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: '74 Skills', sublabel: '8 categorias' },
            { label: '3 Projetos', sublabel: 'portfólio' },
            { label: '100%', sublabel: 'gratuito' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-sm font-bold text-white">{item.label}</p>
              <p className="text-[10px] text-gray-500">{item.sublabel}</p>
            </div>
          ))}
        </motion.div>

        {/* Mode toggle */}
        <motion.div
          className="flex gap-1 p-1 rounded-xl bg-white/5 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <button
            type="button"
            onClick={() => setMode('cloud')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer',
              mode === 'cloud' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
            )}
          >
            <Cloud className="w-3.5 h-3.5" /> Nuvem (sincronizado)
          </button>
          <button
            type="button"
            onClick={() => setMode('local')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer',
              mode === 'local' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
            )}
          >
            <HardDrive className="w-3.5 h-3.5" /> Local (navegador)
          </button>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              {mode === 'cloud' ? 'Nome de usuário' : 'Como podemos te chamar?'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome..."
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
            />
          </div>

          {mode === 'cloud' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
              />
            </motion.div>
          )}

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={!name.trim() || loading}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {mode === 'cloud'
              ? (authMode === 'register' ? 'Criar Conta' : 'Entrar')
              : 'Começar Jornada'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </Button>

          {mode === 'cloud' && (
            <p className="text-center text-xs text-gray-500">
              {authMode === 'login' ? (
                <>
                  Não tem conta?{' '}
                  <button type="button" onClick={() => { setAuthMode('register'); setError(''); }} className="text-blue-400 hover:underline cursor-pointer">
                    Criar conta
                  </button>
                </>
              ) : (
                <>
                  Já tem conta?{' '}
                  <button type="button" onClick={() => { setAuthMode('login'); setError(''); }} className="text-blue-400 hover:underline cursor-pointer">
                    Fazer login
                  </button>
                </>
              )}
            </p>
          )}
        </motion.form>

        {/* Footer */}
        <motion.p
          className="text-center text-[10px] text-gray-600 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {mode === 'cloud'
            ? 'Seus dados ficam salvos na nuvem e sincronizados entre dispositivos'
            : 'Seus dados ficam salvos localmente no navegador'}
        </motion.p>
      </motion.div>
    </div>
  );
}
