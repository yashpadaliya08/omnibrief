'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RefreshCw,
  Cpu,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { IntelligenceReport } from '@/types/omnibrief';

interface NodeInterrogatorProps {
  nodeTitle: string;
  nodeType: string;
  nodeData: Record<string, unknown>;
  report: IntelligenceReport;
  nebiusApiKey?: string;
  modelName?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  source?: string;
  timestamp: string;
}

function cleanAnswerText(raw: string): string {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed.answer === 'string') return parsed.answer;
      if (typeof parsed.response === 'string') return parsed.response;
      if (typeof parsed.text === 'string') return parsed.text;
    } catch {
      // not valid JSON
    }
  }
  return raw;
}

function formatBold(str: string): React.ReactNode {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function FormattedMessageText({ text }: { text: string }) {
  const clean = cleanAnswerText(text);
  const lines = clean.split('\n');
  return (
    <div className="space-y-1.5 text-xs leading-relaxed font-sans">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;
        if (trimmed.startsWith('### ')) {
          return (
            <h5 key={i} className="font-bold text-white text-[13px] pt-1 text-indigo-300">
              {trimmed.replace('### ', '')}
            </h5>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h4 key={i} className="font-bold text-white text-sm pt-1.5 text-indigo-200">
              {trimmed.replace('## ', '')}
            </h4>
          );
        }
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={i} className="flex items-start gap-1.5 pl-2 text-zinc-300">
              <span className="text-indigo-400 font-bold">•</span>
              <span>{formatBold(trimmed.substring(2))}</span>
            </div>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          const match = trimmed.match(/^(\d+\.)\s(.*)$/);
          return (
            <div key={i} className="flex items-start gap-1.5 pl-2 text-zinc-300">
              <span className="text-cyan-400 font-mono font-bold">{match ? match[1] : '•'}</span>
              <span>{formatBold(match ? match[2] : trimmed)}</span>
            </div>
          );
        }
        return <p key={i} className="text-zinc-200">{formatBold(trimmed)}</p>;
      })}
    </div>
  );
}

export const NodeInterrogator = React.memo(function NodeInterrogator({
  nodeTitle,
  nodeType,
  nodeData,
  report,
  nebiusApiKey,
  modelName,
}: NodeInterrogatorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Dynamic contextual suggested questions based on nodeType
  const getSuggestions = () => {
    switch (nodeType) {
      case 'competitor':
        return [
          'How can a 3-person startup bypass their procurement moat?',
          'What are their critical vulnerabilities reported in G2 reviews?',
        ];
      case 'techStack':
        return [
          'Show me an exact SQL/WASM code pattern to implement this sync.',
          'What are the failure modes of this local-first architecture?',
        ];
      case 'moat':
        return [
          'How can an aggressive challenger erode this defensibility?',
          'What metrics prove this switching cost is weakening?',
        ];
      case 'whitespace':
        return [
          'Give me a 30-day MVP roadmap to capture this white-space.',
          'What pricing wedge will dislodge incumbents here?',
        ];
      default:
        return [
          'What is the single biggest threat that could kill this entity in 18 months?',
          'How defensible is their current gross margin structure?',
        ];
    }
  };

  const handleAsk = async (questionText: string) => {
    if (!questionText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: questionText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/interrogate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionText.trim(),
          nodeTitle,
          nodeType,
          nodeData,
          targetEntity: report.targetEntity,
          citations: report.citations,
          nebiusApiKey,
          modelName,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: cleanAnswerText(data.answer || 'Analysis complete.'),
          source: data.source || 'NVIDIA Nemotron-70B on Nebius',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error('Interrogation failed:', err);
      const errorMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: 'Failed to retrieve model answer. Please check network connection.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(cleanAnswerText(text));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-950/40">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-black tracking-wide uppercase text-white font-mono">
                Interrogate This Node
              </h4>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Nemotron Context Chat
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">
              Ask deep follow-ups strictly grounded in {nodeTitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3">
          {/* Preset Suggestion Chips */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Quick Inquiries:
            </span>
            <div className="flex flex-col gap-1.5">
              {getSuggestions().map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(suggestion)}
                  disabled={loading}
                  className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-left border border-zinc-800/80 hover:border-indigo-500/40 text-[11px] text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-between group disabled:opacity-50"
                >
                  <span className="line-clamp-1">{suggestion}</span>
                  <Sparkles className="w-3 h-3 text-indigo-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Log */}
          {messages.length > 0 && (
            <div className="space-y-3 max-h-[340px] overflow-y-auto p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col space-y-1 ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 px-1">
                    {msg.sender === 'user' ? (
                      <>
                        <span>Founder</span>
                        <User className="w-3 h-3 text-zinc-400" />
                      </>
                    ) : (
                      <>
                        <Bot className="w-3 h-3 text-indigo-400" />
                        <span className="text-indigo-300 font-bold">Nemotron-70B</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </>
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[95%] relative group ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-950/30'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none shadow-md'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
                    ) : (
                      <FormattedMessageText text={msg.text} />
                    )}

                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="absolute top-2 right-2 p-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-indigo-300 font-mono">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>Nemotron is reasoning through {nodeTitle}...</span>
                </div>
              )}
            </div>
          )}

          {/* Question Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(inputQuestion);
            }}
            className="flex items-center gap-2 pt-1"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder={`Ask anything about ${nodeTitle}...`}
              disabled={loading}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !inputQuestion.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-colors cursor-pointer shadow-md shadow-indigo-950/40"
              title="Submit Inquiry"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
});
