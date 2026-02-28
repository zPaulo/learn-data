'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Rocket, PartyPopper, Download } from 'lucide-react';
import { useProgressStore } from '@/stores/useProgressStore';
import { roadmap } from '@/data/roadmap';
import { calculateOverallProgress } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function CompletionCelebration() {
  const completedSkills = useProgressStore((s) => s.completedSkills);
  const completedProjects = useProgressStore((s) => s.completedProjects);
  const username = useProgressStore((s) => s.username);

  const overall = calculateOverallProgress(roadmap, completedSkills);
  const allProjectsDone = roadmap.projects.every((p) => completedProjects.includes(p.id));

  if (overall.percentage < 100 || !allProjectsDone) return null;

  const handleDownloadCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#1e1b4b');
    gradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 800);

    // Border
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 1120, 720);

    // Inner border
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, 1100, 700);

    // Title
    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 18px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICADO DE CONCLUSAO', 600, 150);

    // Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px system-ui';
    ctx.fillText(username || 'Estudante', 600, 300);

    // Description
    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px system-ui';
    ctx.fillText('completou com sucesso a', 600, 370);

    // Course name
    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 32px system-ui';
    ctx.fillText('Trilha Data Analyst Junior', 600, 430);

    // Stats
    ctx.fillStyle = '#64748b';
    ctx.font = '16px system-ui';
    ctx.fillText(`${overall.total} habilidades  |  ${roadmap.projects.length} projetos de portfolio  |  8 categorias`, 600, 500);

    // Date
    ctx.fillStyle = '#475569';
    ctx.font = '14px system-ui';
    const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    ctx.fillText(date, 600, 600);

    // Star decoration
    ctx.fillStyle = '#fbbf24';
    ctx.font = '40px system-ui';
    ctx.fillText('\u2605', 600, 680);

    // Download
    const link = document.createElement('a');
    link.download = `certificado-data-analyst-${username}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-10"
    >
      <Card className="relative overflow-hidden border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 via-purple-500/5 to-blue-500/5 shadow-2xl shadow-yellow-500/5">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-yellow-400/20"
              initial={{ y: '100%', x: `${15 + i * 15}%`, opacity: 0 }}
              animate={{
                y: [null, '-20%'],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        <div className="relative text-center py-4">
          {/* Trophy icon */}
          <motion.div
            className="flex justify-center mb-4"
            initial={{ rotate: -10 }}
            animate={{ rotate: [null, 10, -10, 0] }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-xl shadow-yellow-500/30">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Congratulations text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <PartyPopper className="w-5 h-5 text-yellow-400" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 gradient-text">
                Parabéns, {username}!
              </h2>
              <PartyPopper className="w-5 h-5 text-yellow-400" />
            </div>

            <p className="text-gray-300 text-sm mb-2 max-w-md mx-auto">
              Você completou <span className="font-bold text-white">todas as {overall.total} habilidades</span> e{' '}
              <span className="font-bold text-white">todos os {roadmap.projects.length} projetos</span> da Trilha Data Analyst Junior!
            </p>

            <p className="text-gray-400 text-xs mb-6 max-w-lg mx-auto leading-relaxed">
              Essa conquista mostra dedicação, disciplina e uma vontade real de crescer na área de dados.
              Você agora tem o conhecimento base de um Analista de Dados Junior. Continue praticando,
              construindo projetos e nunca pare de aprender. O mercado de dados precisa de pessoas como você!
            </p>
          </motion.div>

          {/* Achievement badges */}
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {[
              { icon: Star, label: 'Todas as Skills', color: 'from-yellow-500 to-amber-500' },
              { icon: Rocket, label: 'Portfólio Completo', color: 'from-purple-500 to-pink-500' },
              { icon: Trophy, label: 'Data Analyst Jr', color: 'from-blue-500 to-cyan-500' },
            ].map((badge) => (
              <motion.div
                key={badge.label}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${badge.color} shadow-lg`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                <badge.icon className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white">{badge.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Download certificate */}
          <Button
            onClick={handleDownloadCertificate}
            variant="secondary"
            size="md"
          >
            <Download className="w-4 h-4" />
            Baixar Certificado
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
