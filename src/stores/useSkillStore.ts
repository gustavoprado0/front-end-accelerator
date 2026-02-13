import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

export type SkillLevel = 'iniciante' | 'intermediário' | 'avançado' | 'especialista';
export type SkillCategory = 'fundamento' | 'framework' | 'tooling' | 'avançado';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  progress: number;
  icon: string;
  notes: string;
  createdAt: string;
}

export interface SkillState {
  skills: Skill[];
}

export interface SkillActions {
  addSkill: (skill: Omit<Skill, 'id' | 'createdAt'>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
}

export type SkillStore = SkillState & SkillActions;

const now = new Date().toISOString();

const defaultSkills: Skill[] = [
  { id: '1', name: 'React', category: 'framework', level: 'intermediário', progress: 65, icon: '⚛️', notes: 'Hooks, Context, Patterns', createdAt: now },
  { id: '2', name: 'TypeScript', category: 'fundamento', level: 'intermediário', progress: 55, icon: '🔷', notes: 'Generics, Utility Types', createdAt: now },
];

const createSkillSlice = (
  set: Parameters<StateCreator<SkillStore>>[0],
  get: Parameters<StateCreator<SkillStore>>[1]
): SkillStore => ({

  skills: defaultSkills,

  addSkill: (skill) => {
    const exists = get().skills.some(
      (s) => s.name.toLowerCase() === skill.name.toLowerCase()
    );

    if (exists) return;

    const newSkill: Skill = {
      ...skill,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      skills: [...state.skills, newSkill],
    }));
  },

  updateSkill: (id, updates) =>
    set((state) => ({
      skills: state.skills.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),

  removeSkill: (id) =>
    set((state) => ({
      skills: state.skills.filter((s) => s.id !== id),
    })),
});

export const useSkillStore = create<SkillStore>()(
  persist(
    (set, get) => ({
      ...createSkillSlice(set, get),
    }),
    {
      name: 'skill-tracker-storage',
      partialize: (state) => ({
        skills: state.skills,
      }),
    }
  )
);

export const useSkills = () => useSkillStore((state) => state.skills);

export const useSkillActions = () =>
  useSkillStore((state) => ({
    addSkill: state.addSkill,
    updateSkill: state.updateSkill,
    removeSkill: state.removeSkill,
  }));
