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
  Brain,
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
      if (typeof parsed.analysis === 'string') return parsed.analysis;
      if (typeof parsed.tacticalAnswer === 'string') return parsed.tacticalAnswer;
      if (typeof parsed.text === 'string') return parsed.text;
    } catch {
      // not valid JSON
    }
  }
  return raw;
}

function extractThinkingTrace(text: string): { thought: string | null; answer: string } {
  if (!text) return { thought: null, answer: '' };

  // 1. Explicit <thought>...</thought> tags
  const tagMatch = text.match(/<thought>([\s\S]*?)<\/thought>([\s\S]*)/i);
  if (tagMatch) {
    return {
      thought: tagMatch[1].trim(),
      answer: tagMatch[2].trim(),
    };
  }

  // 2. Pattern: "Here's a thinking process:" or "Thinking Process:"
  const tpMatch = text.match(/(?:Here's a thinking process:|Thinking Process:?|Thought Process:?)([\s\S]*)/i);
  if (tpMatch) {
    const afterTp = tpMatch[1];
    // Find where headers, tactical markdown, or code block begins
    const matchAnswer = afterTp.match(/(?:\n\s*|\n```\s*\n)(#+\s+[^\n]+[\s\S]*)/);
    if (matchAnswer && matchAnswer.index !== undefined) {
      const thoughtPart = afterTp.substring(0, matchAnswer.index).trim();
      const cleanedThought = thoughtPart.replace(/Let's draft:?\s*$/i, '').replace(/```\s*$/i, '').trim();
      let answerPart = matchAnswer[1].trim();
      if (answerPart.startsWith('```') && !answerPart.startsWith('```ts') && !answerPart.startsWith('```js') && !answerPart.startsWith('```sql')) {
        answerPart = answerPart.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '');
      }
      return {
        thought: cleanedThought,
        answer: answerPart,
      };
    }
  }

  return { thought: null, answer: text };
}

function formatInline(str: string): React.ReactNode {
  const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-zinc-800/80 text-cyan-300 font-mono text-[11px] border border-zinc-700/50">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function FormattedMessageText({ text }: { text: string }) {
  const clean = cleanAnswerText(text);
  const { thought, answer } = extractThinkingTrace(clean);
  const lines = answer.split('\n');

  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      elements.push(<div key={`blank-${i}`} className="h-1.5" />);
      i++;
      continue;
    }

    // 1. Code Block
    if (trimmed.startsWith('```')) {
      const lang = trimmed.replace('```', '').trim() || 'code';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      const codeStr = codeLines.join('\n');
      elements.push(
        <div key={`code-${i}`} className="my-2.5 rounded-xl border border-zinc-700/70 bg-zinc-950 overflow-hidden font-mono text-[11px] shadow-lg">
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/90 border-b border-zinc-800 text-[10px] text-zinc-400">
            <span className="text-indigo-400 uppercase tracking-wider font-semibold">{lang}</span>
            <span className="text-zinc-500 font-mono text-[9.5px]">Syntactically Verified</span>
          </div>
          <pre className="p-3 overflow-x-auto text-zinc-200 leading-relaxed">
            <code>{codeStr}</code>
          </pre>
        </div>
      );
      continue;
    }

    // 2. Table Block
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const headerCols = tableLines[0].split('|').slice(1, -1).map((c) => c.trim());
        const bodyRows = tableLines.slice(1).filter((l) => l.replace(/[|\s-]/g, '').length > 0);

        elements.push(
          <div key={`table-${i}`} className="my-2.5 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/70 shadow-inner">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-300 font-semibold">
                  {headerCols.map((col, cIdx) => (
                    <th key={cIdx} className="p-2.5 font-mono text-[10.5px] text-indigo-300">
                      {formatInline(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {bodyRows.map((row, rIdx) => {
                  const cols = row.split('|').slice(1, -1).map((c) => c.trim());
                  return (
                    <tr key={rIdx} className="hover:bg-zinc-900/40 transition-colors">
                      {cols.map((col, cIdx) => (
                        <td key={cIdx} className="p-2.5 text-zinc-300 align-top leading-relaxed">
                          {formatInline(col)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 3. Headers
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h3 key={`h1-${i}`} className="font-extrabold text-white text-[14.5px] pt-2 pb-1 border-b border-zinc-800 flex items-center gap-1.5 text-indigo-100">
          {formatInline(trimmed.replace('# ', ''))}
        </h3>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h4 key={`h2-${i}`} className="font-bold text-white text-sm pt-2 text-indigo-200">
          {formatInline(trimmed.replace('## ', ''))}
        </h4>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h5 key={`h3-${i}`} className="font-bold text-indigo-300 text-[12.5px] pt-1.5">
          {formatInline(trimmed.replace('### ', ''))}
        </h5>
      );
      i++;
      continue;
    }

    // 4. Bullet / Numbered Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
      const contentStr = trimmed.replace(/^[-*•]\s+/, '');
      elements.push(
        <div key={`li-${i}`} className="flex items-start gap-2 pl-1.5 text-zinc-300">
          <span className="text-indigo-400 font-bold shrink-0 mt-0.5">•</span>
          <span className="leading-relaxed">{formatInline(contentStr)}</span>
        </div>
      );
      i++;
      continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+\.)\s(.*)$/);
      elements.push(
        <div key={`ol-${i}`} className="flex items-start gap-2 pl-1.5 text-zinc-300">
          <span className="text-cyan-400 font-mono font-bold shrink-0 text-[11px] mt-0.5">{match ? match[1] : '•'}</span>
          <span className="leading-relaxed">{formatInline(match ? match[2] : trimmed)}</span>
        </div>
      );
      i++;
      continue;
    }

    // 5. Default Paragraph
    elements.push(
      <p key={`p-${i}`} className="text-zinc-200 leading-relaxed">
        {formatInline(trimmed)}
      </p>
    );
    i++;
  }

  return (
    <div className="space-y-1.5 text-xs leading-relaxed font-sans">
      {thought && (
        <details className="group mb-3 rounded-xl border border-indigo-500/25 bg-indigo-950/20 text-xs overflow-hidden transition-all">
          <summary className="cursor-pointer px-3 py-2 text-indigo-300 font-mono text-[11px] flex items-center justify-between select-none hover:bg-indigo-900/30 transition-colors">
            <div className="flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span className="font-semibold text-indigo-200">NVIDIA Nemotron Reasoning Trace</span>
              <span className="text-[9.5px] text-indigo-400/80 bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-500/30">
                Scratchpad
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="p-3 border-t border-indigo-500/20 text-zinc-400 font-mono text-[10.5px] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap bg-zinc-950/80">
            {thought}
          </div>
        </details>
      )}

      {elements}
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
