import React from 'react';
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
  icon: React.ComponentType<{ className?: string }>;
}

const stack: Skill[] = [
  { name: 'ROS 2',       category: 'ROBOTICS', icon: SiRos },
  { name: 'C++',         category: 'ROBOTICS', icon: SiCplusplus },
  { name: 'Python',      category: 'ROBOTICS', icon: SiPython },

  { name: 'PyTorch',     category: 'AI_ML',    icon: SiPytorch },
  { name: 'OpenCV',      category: 'AI_ML',    icon: SiOpencv },
  { name: 'CUDA',        category: 'AI_ML',    icon: SiNvidia },
  { name: 'TensorRT',    category: 'AI_ML',    icon: SiNvidia },

  { name: 'Linux',       category: 'INFRA',    icon: SiLinux },
  { name: 'Docker',      category: 'INFRA',    icon: SiDocker },
  { name: 'Git',         category: 'INFRA',    icon: SiGit },
  { name: 'Jetson Orin', category: 'INFRA',    icon: SiNvidia },
  { name: 'Isaac Sim',   category: 'INFRA',    icon: SiNvidia },
  { name: 'Isaac ROS',   category: 'INFRA',    icon: SiNvidia },

  { name: 'Jira',        category: 'PRODUCT',  icon: SiJira },
  { name: 'Figma',       category: 'PRODUCT',  icon: SiFigma },
  { name: 'Notion',      category: 'PRODUCT',  icon: SiNotion },
];

const disciplines = ['SLAM', 'Motion Planning', 'MPC / Control', 'LLM / Agents', 'LiDAR · IMU', 'Roadmap · Strategy'];

const categories: { id: Category; label: string; count: number }[] = [
  { id: 'ROBOTICS', label: 'Robotics / Autonomy', count: stack.filter((s) => s.category === 'ROBOTICS').length },
  { id: 'AI_ML',    label: 'AI / ML',             count: stack.filter((s) => s.category === 'AI_ML').length },
  { id: 'INFRA',    label: 'Infra / DevOps',      count: stack.filter((s) => s.category === 'INFRA').length },
  { id: 'PRODUCT',  label: 'Product',             count: stack.filter((s) => s.category === 'PRODUCT').length },
];

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const Icon = skill.icon;
  return (
    <div className="group relative flex flex-col items-center justify-center aspect-square border border-white/5 bg-ink-900/50 hover:border-nv-500/40 hover:bg-ink-900 hover:-translate-y-0.5 transition-all p-4">
      <div className="absolute top-2 left-2 font-mono text-[11px] uppercase tracking-wider text-ink-400 group-hover:text-nv-500 transition-colors">
        {skill.category.slice(0, 3)}
      </div>
      <div className="flex items-center justify-center mb-3 h-10">
        <Icon className="h-9 w-9 text-ink-200 group-hover:text-nv-500 transition-colors" />
      </div>
      <div className="font-mono text-[13px] text-center text-ink-200 group-hover:text-white transition-colors">
        {skill.name}
      </div>
    </div>
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
        <div className="mb-12 lg:mb-16 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-nv-500" />
              <span className="tech-label text-ink-300">TECHNICAL STACK / 04</span>
            </div>
            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4">
              Built in the stack
            </h2>
            <p className="text-lg md:text-xl text-ink-200 max-w-2xl leading-relaxed">
              From real-time control loops on embedded Linux to product discovery
              decks — I work across the whole vertical.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-1">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.15em] border-b border-white/5 py-2"
              >
                <span className="text-ink-400">{cat.id}</span>
                <span className="text-ink-200">{cat.label}</span>
                <span className="text-nv-500 w-6 text-right">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-px bg-white/5 border border-white/5">
          {stack.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-ink-400 mr-2">
            // Disciplines
          </span>
          {disciplines.map((d) => (
            <span
              key={d}
              className="px-2.5 py-1 font-mono text-[12px] border border-white/10 text-ink-300"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
