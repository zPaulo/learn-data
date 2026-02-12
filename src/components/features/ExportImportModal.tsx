'use client';

import { useState } from 'react';
import { Download, Upload, Copy, Check } from 'lucide-react';
import { useProgressStore } from '@/stores/useProgressStore';
import { roadmap } from '@/data/roadmap';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { ExportData } from '@/types';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportImportModal({ isOpen, onClose }: ExportImportModalProps) {
  const [tab, setTab] = useState<'export' | 'import'>('export');
  const [importText, setImportText] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const username = useProgressStore((s) => s.username);
  const createdAt = useProgressStore((s) => s.createdAt);
  const completedSkills = useProgressStore((s) => s.completedSkills);
  const completedProjects = useProgressStore((s) => s.completedProjects);
  const importProgress = useProgressStore((s) => s.importProgress);

  const exportData: ExportData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    profile: {
      username: username || '',
      createdAt: createdAt || new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    },
    progress: {
      username: username || '',
      completedSkills,
      completedProjects,
      lastUpdated: new Date().toISOString(),
    },
  };

  const jsonString = JSON.stringify(exportData, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learn-data-${username}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const data = JSON.parse(importText) as ExportData;
      if (data.version !== 1) {
        setMessage({ type: 'error', text: 'Versão do arquivo não suportada.' });
        return;
      }
      if (!data.progress?.completedSkills) {
        setMessage({ type: 'error', text: 'Formato de arquivo inválido.' });
        return;
      }

      // Validate skill IDs
      const allSkillIds = roadmap.categories.flatMap((c) => c.skills.map((s) => s.id));
      const validSkills = data.progress.completedSkills.filter((id) => allSkillIds.includes(id));
      const allProjectIds = roadmap.projects.map((p) => p.id);
      const validProjects = (data.progress.completedProjects || []).filter((id) => allProjectIds.includes(id));

      importProgress(validSkills, validProjects);
      setMessage({ type: 'success', text: `Importado! ${validSkills.length} habilidades e ${validProjects.length} projetos restaurados.` });
      setImportText('');
    } catch {
      setMessage({ type: 'error', text: 'JSON inválido. Verifique o conteúdo e tente novamente.' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImportText(ev.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Exportar / Importar Progresso">
      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-white/5 mb-4">
        <button
          onClick={() => { setTab('export'); setMessage(null); }}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer',
            tab === 'export' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
          )}
        >
          <Download className="w-3.5 h-3.5" /> Exportar
        </button>
        <button
          onClick={() => { setTab('import'); setMessage(null); }}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer',
            tab === 'import' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
          )}
        >
          <Upload className="w-3.5 h-3.5" /> Importar
        </button>
      </div>

      {tab === 'export' ? (
        <div>
          <pre className="text-[11px] text-gray-400 bg-white/5 rounded-xl p-4 max-h-48 overflow-auto mb-4 border border-white/5">
            {jsonString}
          </pre>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={handleCopy} className="flex-1">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar JSON'}
            </Button>
            <Button size="sm" onClick={handleDownload} className="flex-1">
              <Download className="w-3.5 h-3.5" /> Baixar Arquivo
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Cole o JSON aqui..."
            className="w-full h-32 text-xs text-gray-300 bg-white/5 rounded-xl p-4 border border-white/10 resize-none focus:outline-none focus:border-blue-500/50 mb-3"
          />
          <div className="flex gap-2 mb-3">
            <label className="flex-1">
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              <Button variant="secondary" size="sm" className="w-full pointer-events-none">
                <Upload className="w-3.5 h-3.5" /> Escolher Arquivo
              </Button>
            </label>
            <Button size="sm" onClick={handleImport} disabled={!importText.trim()} className="flex-1">
              Importar
            </Button>
          </div>
        </div>
      )}

      {message && (
        <div className={cn(
          'mt-3 p-3 rounded-xl text-xs border',
          message.type === 'success'
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-red-500/10 text-red-400 border-red-500/20'
        )}>
          {message.text}
        </div>
      )}
    </Modal>
  );
}
