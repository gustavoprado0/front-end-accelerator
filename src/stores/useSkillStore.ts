import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SkillLevel = 'iniciante' | 'intermediário' | 'avançado' | 'especialista';
export type SkillCategory = 'fundamento' | 'framework' | 'tooling' | 'avançado';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  progress: number; // 0-100
  icon: string;
  notes: string;
  createdAt: string;
}

interface SkillStore {
  skills: Skill[];
  addSkill: (skill: Omit<Skill, 'id' | 'createdAt'>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
}

const defaultSkills: Skill[] = [
  { id: '1', name: 'React', category: 'framework', level: 'intermediário', progress: 65, icon: '⚛️', notes: 'Hooks, Context, Patterns', createdAt: new Date().toISOString() },
  { id: '2', name: 'TypeScript', category: 'fundamento', level: 'intermediário', progress: 55, icon: '🔷', notes: 'Generics, Utility Types', createdAt: new Date().toISOString() },
  { id: '3', name: 'Tailwind CSS', category: 'tooling', level: 'avançado', progress: 80, icon: '🎨', notes: 'Design system, Responsivo', createdAt: new Date().toISOString() },
  { id: '4', name: 'Next.js', category: 'framework', level: 'intermediário', progress: 50, icon: '▲', notes: 'SSR, SSG, App Router', createdAt: new Date().toISOString() },
  { id: '5', name: 'TanStack Query', category: 'tooling', level: 'iniciante', progress: 20, icon: '🔄', notes: 'Cache, Mutations', createdAt: new Date().toISOString() },
  { id: '6', name: 'Zustand', category: 'tooling', level: 'iniciante', progress: 15, icon: '🐻', notes: 'Estado global simples', createdAt: new Date().toISOString() },
  { id: '7', name: 'React Hook Form', category: 'tooling', level: 'intermediário', progress: 45, icon: '📝', notes: 'Validação com Zod', createdAt: new Date().toISOString() },
  { id: '8', name: 'Framer Motion', category: 'avançado', level: 'iniciante', progress: 10, icon: '✨', notes: 'Animações, Gestures', createdAt: new Date().toISOString() },
  { id: '9', name: 'Node.js', category: 'fundamento', level: 'iniciante', progress: 25, icon: '🟢', notes: 'APIs REST básicas', createdAt: new Date().toISOString() },
  { id: '10', name: 'TanStack Router', category: 'tooling', level: 'iniciante', progress: 5, icon: '🧭', notes: 'File-based routing', createdAt: new Date().toISOString() },
];

export const useSkillStore = create<SkillStore>()(
  persist(
    (set) => ({
      skills: defaultSkills,
      addSkill: (skill) =>
        set((state) => ({
          skills: [
            ...state.skills,
            { ...skill, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
          ],
        })),
      updateSkill: (id, updates) =>
        set((state) => ({
          skills: state.skills.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
      removeSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== id),
        })),
    }),
    { name: 'skill-tracker-storage' }
  )
);
