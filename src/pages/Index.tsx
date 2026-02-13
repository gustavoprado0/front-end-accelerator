import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { Code2, Rocket, Target } from 'lucide-react';
import { useSkillStore } from '@/stores/useSkillStore';
import SkillCard from '@/components/SkillCard';
import AddSkillForm from '@/components/AddSkillForm';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const { skills } = useSkillStore();

  const avgProgress = skills.length
    ? Math.round(skills.reduce((sum, s) => sum + s.progress, 0) / skills.length)
    : 0;

  const categories = ['todos', 'fundamento', 'framework', 'tooling', 'avançado'] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="bg-gradient-hero py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--glow)/0.08),transparent_60%)]" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-gradient-primary">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground font-display">
                Dev Skill Tracker
              </h1>
            </div>
            <p className="text-primary-foreground/70 text-lg max-w-xl mb-8">
              Acompanhe sua evolução como frontend specialist. Cada skill que você domina te aproxima do próximo nível.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { icon: Target, label: 'Skills', value: skills.length },
              { icon: Rocket, label: 'Progresso Médio', value: `${avgProgress}%` },
              { icon: Code2, label: 'Nível', value: avgProgress < 25 ? 'Iniciante' : avgProgress < 50 ? 'Intermediário' : avgProgress < 75 ? 'Avançado' : 'Especialista' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center">
                <stat.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground font-mono">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <Tabs defaultValue="skills" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList className="bg-muted">
              <TabsTrigger value="skills">⚡ Minhas Skills</TabsTrigger>
              <TabsTrigger value="roadmap">🗺️ Roadmap</TabsTrigger>
            </TabsList>
            <TabsContent value="skills" className="mt-0">
              <AddSkillForm />
            </TabsContent>
          </div>

          <TabsContent value="skills" className="space-y-6">
            <Tabs defaultValue="todos">
              <TabsList className="bg-muted mb-4">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="capitalize text-xs">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
              {categories.map((cat) => (
                <TabsContent key={cat} value={cat}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                      {skills
                        .filter((s) => cat === 'todos' || s.category === cat)
                        .map((skill, i) => (
                          <SkillCard key={skill.id} skill={skill} index={i} />
                        ))}
                    </AnimatePresence>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="roadmap">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Roadmap Frontend Specialist 2026</h2>
                <p className="text-muted-foreground">Baseado nas tecnologias mais demandadas pelo mercado.</p>
              </div>
              <RoadmapTimeline />

              {/* Tech Stack Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 glass rounded-xl p-6 shadow-card"
              >
                <h3 className="font-semibold text-foreground mb-4">🛠️ Stack Recomendada</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  {[
                    { name: 'Vite', desc: 'Build tool' },
                    { name: 'TanStack Router', desc: 'Roteamento' },
                    { name: 'TanStack Query', desc: 'Server state' },
                    { name: 'Zustand', desc: 'Client state' },
                    { name: 'RHF + Zod', desc: 'Formulários' },
                    { name: 'Framer Motion', desc: 'Animações' },
                    { name: 'Radix UI', desc: 'Primitivos' },
                    { name: 'Tailwind CSS', desc: 'Estilização' },
                    { name: 'Vitest', desc: 'Testes' },
                  ].map((tech) => (
                    <div key={tech.name} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50">
                      <span className="font-mono text-primary font-medium">{tech.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{tech.desc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
