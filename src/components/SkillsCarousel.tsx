import React from 'react';
import { motion } from 'framer-motion';
import {
  SiRos,
  SiPython,
  SiCplusplus,
  SiNvidia,
  SiPytorch,
  SiLinux,
  SiDocker,
  SiGit,
  SiJira,
  SiFigma,
  SiNotion,
  SiOpencv,
} from 'react-icons/si';

type Category = 'ROBOTICS' | 'AI_ML' | 'INFRA' | 'PRODUCT';

interface Skill {
  name: string;
  category: Category;
  icon?: React.ComponentType<{ className?: string }>;
  mono?: string; // text-only fallback for topics with no icon
}

const stack: Skill[] = [
  // Robotics / Autonomy
  { name: 'ROS 2',              category: 'ROBOTICS', icon: SiRos },
  { name: 'C++',                category: 'ROBOTICS', icon: SiCplusplus },
  { name: 'Python',             category: 'ROBOTICS', icon: SiPython },
  { name: 'Motion Planning',    category: 'ROBOTICS', mono: 'MP' },
  { name: 'MPC / Control',      category: 'ROBOTICS', mono: 'CTL' },
  { name: 'SLAM',               category: 'ROBOTICS', mono: 'SLAM' },
  { name: 'LiDAR · IMU',        category: 'ROBOTICS', mono: 'SNS' },

  // AI / ML
  { name: 'PyTorch',            category: 'AI_ML',    icon: SiPytorch },
  { name: 'OpenCV',             category: 'AI_ML',    icon: SiOpencv },
  { name: 'CUDA',               category: 'AI_ML',    icon: SiNvidia },
  { name: 'TensorRT',           category: 'AI_ML',    mono: 'TRT' },
  { name: 'LLM / Agents',       category: 'AI_ML',    mono: 'LLM' },

  // Infra
  { name: 'Linux',              category: 'INFRA',    icon: SiLinux },
  { name: 'Docker',             category: 'INFRA',    icon: SiDocker },
  { name: 'Git',                category: 'INFRA',    icon: SiGit },
  { name: 'Jetson',             category: 'INFRA',    icon: SiNvidia },

  // Product
  { name: 'Jira',               category: 'PRODUCT',  icon: SiJira },
  { name: 'Figma',              category: 'PRODUCT',  icon: SiFigma },
  { name: 'Notion',             category: 'PRODUCT',  icon: SiNotion },
  { name: 'Roadmap · Strategy', category: 'PRODUCT',  mono: 'PRD' },
];

const categories: { id: Category; label: string; count: number }[] = [
  { id: 'ROBOTICS', label: 'Robotics / Autonomy', count: stack.filter((s) => s.category === 'ROBOTICS').length },
  { id: 'AI_ML',    label: 'AI / ML',             count: stack.filter((s) => s.category === 'AI_ML').length },
  { id: 'INFRA',    label: 'Infra / DevOps',      count: stack.filter((s) => s.category === 'INFRA').length },
  { id: 'PRODUCT',  label: 'Product',             count: stack.filter((s) => s.category === 'PRODUCT').length },
];

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      className="group relative flex flex-col items-center justify-center aspect-square border border-white/5 bg-ink-900/50 hover:border-nv-500/40 hover:bg-ink-900 transition-all p-4"
      whileHover={{ y: -2 }}
    >
      <div className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-wider text-ink-500 group-hover:text-nv-500 transition-colors">
        {skill.category.slice(0, 3)}
      </div>
      <div className="flex items-center justify-center mb-3 h-10">
        {Icon ? (
          <Icon className="h-9 w-9 text-ink-200 group-hover:text-nv-500 transition-colors" />
        ) : (
          <span className="font-mono font-semibold text-xl text-ink-200 group-hover:text-nv-500 transition-colors tracking-wider">
            {skill.mono}
          </span>
        )}
      </div>
      <div className="font-mono text-[11px] text-center text-ink-200 group-hover:text-white transition-colors">
        {skill.name}
      </div>
    </motion.div>
  );
};

const TechStack: React.FC = () => {
  return (
    <section
      id="stack"
      className="relative bg-ink-950 py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint-fine opacity-50" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="mb-12 lg:mb-16 grid grid-cols-12 gap-6 items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-nv-500" />
              <span className="tech-label text-nv-500">TECHNICAL_STACK / 03</span>
            </div>
            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4">
              Built in the stack
            </h2>
            <p className="text-base md:text-lg text-ink-300 max-w-2xl">
              From real-time control loops on embedded Linux to product discovery
              decks — I work across the whole vertical.
            </p>
          </div>

          {/* Category breakdown */}
          <div className="col-span-12 lg:col-span-4 space-y-1">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] border-b border-white/5 py-2"
              >
                <span className="text-ink-500">{cat.id}</span>
                <span className="text-ink-200">{cat.label}</span>
                <span className="text-nv-500 w-6 text-right">{cat.count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-px bg-white/5 border border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stack.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </motion.div>

        <motion.p
          className="mt-8 font-mono text-[11px] text-ink-500 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          // Always learning · Currently deep in CUDA optimization and MPC solver warm-starts
        </motion.p>
      </div>
    </section>
  );
};

export default TechStack;
