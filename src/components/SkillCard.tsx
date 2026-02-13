import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Skill, useSkillStore } from '@/stores/useSkillStore';
import ProgressRing from './ProgressRing';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const levelColors: Record<string, string> = {
  iniciante: 'bg-muted text-muted-foreground',
  intermediário: 'bg-primary/10 text-primary',
  avançado: 'bg-accent/10 text-accent',
  especialista: 'bg-glow/20 text-glow',
};

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const { updateSkill, removeSkill } = useSkillStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="group glass rounded-xl p-5 shadow-card hover:shadow-glow transition-shadow duration-300"
    >
      <div className="flex items-start gap-4">
        <ProgressRing progress={skill.progress} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{skill.icon}</span>
            <h3 className="font-semibold text-foreground truncate">{skill.name}</h3>
            <button
              onClick={() => removeSkill(skill.id)}
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className={levelColors[skill.level]}>
              {skill.level}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">{skill.category}</span>
          </div>
          <Slider
            value={[skill.progress]}
            max={100}
            step={5}
            onValueChange={([val]) => {
              const newLevel = val < 25 ? 'iniciante' : val < 50 ? 'intermediário' : val < 75 ? 'avançado' : 'especialista';
              updateSkill(skill.id, { progress: val, level: newLevel });
            }}
            className="mb-2"
          />
          <p className="text-xs text-muted-foreground">{skill.notes}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
