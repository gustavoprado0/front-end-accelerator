import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useSkillStore, SkillCategory } from '@/stores/useSkillStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const skillSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').max(50, 'Máximo 50 caracteres'),
  category: z.enum(['fundamento', 'framework', 'tooling', 'avançado'], {
    required_error: 'Selecione uma categoria',
  }),
  icon: z.string().trim().min(1, 'Adicione um emoji').max(4, 'Use apenas um emoji'),
  notes: z.string().trim().max(200, 'Máximo 200 caracteres').optional().default(''),
});

type SkillFormData = z.infer<typeof skillSchema>;

const AddSkillForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addSkill } = useSkillStore();

  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: '', category: undefined, icon: '📦', notes: '' },
  });

  const onSubmit = (data: SkillFormData) => {
    addSkill({
      name: data.name,
      category: data.category as SkillCategory,
      level: 'iniciante',
      progress: 0,
      icon: data.icon,
      notes: data.notes || '',
    });
    form.reset();
    setIsOpen(false);
  };

  return (
    <div>
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Skill
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-6 shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Adicionar Skill</h3>
              <button onClick={() => { setIsOpen(false); form.reset(); }} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-3">
                  <FormField control={form.control} name="icon" render={({ field }) => (
                    <FormItem className="w-20">
                      <FormLabel className="text-muted-foreground text-xs">Emoji</FormLabel>
                      <FormControl>
                        <Input {...field} className="text-center text-lg" maxLength={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-muted-foreground text-xs">Nome da Skill</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ex: TanStack Router" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-xs">Categoria</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fundamento">Fundamento</SelectItem>
                        <SelectItem value="framework">Framework</SelectItem>
                        <SelectItem value="tooling">Tooling</SelectItem>
                        <SelectItem value="avançado">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="notes" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-xs">Notas</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="O que estudar..." rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">
                  Adicionar
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddSkillForm;
