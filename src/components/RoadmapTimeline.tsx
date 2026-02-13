import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

interface Phase {
  title: string;
  period: string;
  items: string[];
  status: 'done' | 'current' | 'upcoming';
}

const phases: Phase[] = [
  {
    title: 'Fundamentos Sólidos',
    period: 'Mês 1-2',
    items: ['React (hooks, patterns, composição)', 'TypeScript avançado (generics, utility types)', 'Tailwind CSS (design system, tokens)'],
    status: 'current',
  },
  {
    title: 'Ecossistema Moderno',
    period: 'Mês 3-4',
    items: ['TanStack Query (cache, mutations, prefetch)', 'TanStack Router (file-based routing)', 'Zustand (slices, middleware, devtools)'],
    status: 'upcoming',
  },
  {
    title: 'Formulários & Validação',
    period: 'Mês 5',
    items: ['React Hook Form (multi-step, arrays)', 'Zod (schemas complexos, transforms)', 'Suspense + Error Boundaries'],
    status: 'upcoming',
  },
  {
    title: 'Design Engineering',
    period: 'Mês 6-7',
    items: ['Framer Motion (layout, gestures, exit)', 'Radix UI / Base UI (composição)', 'Acessibilidade (ARIA, keyboard nav)'],
    status: 'upcoming',
  },
  {
    title: 'Nível Especialista',
    period: 'Mês 8-10',
    items: ['Local-first (Electric SQL, Zero)', 'Performance (React Compiler, memo patterns)', 'Testing (Vitest, Testing Library, Playwright)'],
    status: 'upcoming',
  },
];

const statusIcon = (status: Phase['status']) => {
  switch (status) {
    case 'done':
      return <CheckCircle2 className="h-5 w-5 text-primary" />;
    case 'current':
      return <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
        <Circle className="h-5 w-5 text-accent fill-accent" />
      </motion.div>;
    default:
      return <Circle className="h-5 w-5 text-muted-foreground" />;
  }
};

const RoadmapTimeline = () => {
  return (
    <div className="relative">
      {/* Line */}
      <div className="absolute left-[9px] top-3 bottom-3 w-px bg-border" />

      <div className="space-y-8">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative pl-10"
          >
            <div className="absolute left-0 top-0.5">{statusIcon(phase.status)}</div>
            <div className={`glass rounded-xl p-5 ${phase.status === 'current' ? 'shadow-glow ring-1 ring-primary/30' : 'shadow-card'}`}>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-foreground">{phase.title}</h3>
                <span className="text-xs font-mono text-muted-foreground ml-auto">{phase.period}</span>
              </div>
              <ul className="space-y-1.5">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
