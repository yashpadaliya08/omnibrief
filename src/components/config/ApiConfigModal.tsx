'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Key, Cpu, ExternalLink, Check, X, ShieldAlert } from 'lucide-react';

interface ApiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: { nebiusApiKey: string; tavilyApiKey: string; modelName: string }) => void;
  currentConfig: { nebiusApiKey: string; tavilyApiKey: string; modelName: string };
}

export function ApiConfigModal({ isOpen, onClose, onSave, currentConfig }: ApiConfigModalProps) {
  const [nebiusKey, setNebiusKey] = useState(currentConfig.nebiusApiKey);
  const [tavilyKey, setTavilyKey] = useState(currentConfig.tavilyApiKey);
  const [model, setModel] = useState(currentConfig.modelName);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setNebiusKey(currentConfig.nebiusApiKey);
    setTavilyKey(currentConfig.tavilyApiKey);
    setModel(currentConfig.modelName);
  }, [currentConfig]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      nebiusApiKey: nebiusKey.trim(),
      tavilyApiKey: tavilyKey.trim(),
      modelName: model,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Nebius & Tavily Configuration</h3>
              <p className="text-xs text-zinc-400">Configure your GPU inference and live web intelligence keys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {/* Nebius API Key */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-zinc-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-400" />
                <span>Nebius Token Factory API Key</span>
              </label>
              <a
                href="https://tokenfactory.nebius.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Get $25 Credits</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              placeholder="neb-..."
              value={nebiusKey}
              onChange={(e) => setNebiusKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <p className="text-[11px] text-zinc-500">
              Tip: Use activation code <span className="font-mono text-indigo-300 font-bold">NEBIUS-DEVPOST-GLOBAL26</span> for $25 free credits.
            </p>
          </div>

          {/* Model Selector */}
          <div className="space-y-1.5">
            <label className="font-semibold text-zinc-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>NVIDIA Model on Nebius Token Factory</span>
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="nvidia/Llama-3.1-Nemotron-70B-Instruct-HF">nvidia/Llama-3.1-Nemotron-70B-Instruct-HF (Recommended)</option>
              <option value="nvidia/nemotron-4-340b-instruct">nvidia/nemotron-4-340b-instruct (Ultra Reasoning)</option>
              <option value="meta-llama/Meta-Llama-3.1-70B-Instruct">meta-llama/Meta-Llama-3.1-70B-Instruct</option>
              <option value="meta-llama/Meta-Llama-3.1-8B-Instruct">meta-llama/Meta-Llama-3.1-8B-Instruct (Fast Nano)</option>
            </select>
          </div>

          {/* Tavily API Key */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-zinc-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tavily AI Search API Key</span>
              </label>
              <a
                href="https://tavily.com"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Free Tavily Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              placeholder="tvly-..."
              value={tavilyKey}
              onChange={(e) => setTavilyKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Simulation Notice */}
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-2 text-zinc-400 text-[11px]">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              If keys are left blank, OmniBrief runs in <strong>Autonomous Simulation Mode</strong> with realistic market intelligence, allowing instant testing without burning credits.
            </span>
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-600/20"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : null}
              <span>{savedSuccess ? 'Saved!' : 'Save Credentials'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
