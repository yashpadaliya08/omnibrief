import { NodeWarGameImpact } from '@/types/omnibrief';

export function getWarGameNodeStyles(impact?: { status: NodeWarGameImpact; note: string }) {
  if (!impact) {
    return {
      borderClass: '',
      glowClass: '',
      badge: null,
    };
  }

  switch (impact.status) {
    case 'squeezed':
      return {
        borderClass: '!border-rose-500 !ring-2 !ring-rose-500/50 shadow-rose-950/60 animate-pulse',
        glowClass: 'bg-rose-500/10',
        badge: {
          label: 'Squeezed Margin',
          color: 'bg-rose-950 text-rose-300 border-rose-500/50',
          icon: '⚠️',
          note: impact.note,
        },
      };
    case 'strengthened':
      return {
        borderClass: '!border-emerald-500 !ring-2 !ring-emerald-500/50 shadow-emerald-950/60',
        glowClass: 'bg-emerald-500/10',
        badge: {
          label: 'Fortified Moat',
          color: 'bg-emerald-950 text-emerald-300 border-emerald-500/50',
          icon: '🛡️',
          note: impact.note,
        },
      };
    case 'disrupted':
      return {
        borderClass: '!border-amber-500 !ring-2 !ring-amber-500/50 shadow-amber-950/60',
        glowClass: 'bg-amber-500/10',
        badge: {
          label: 'Disrupted',
          color: 'bg-amber-950 text-amber-300 border-amber-500/50',
          icon: '⚡',
          note: impact.note,
        },
      };
    default:
      return {
        borderClass: '',
        glowClass: '',
        badge: null,
      };
  }
}
