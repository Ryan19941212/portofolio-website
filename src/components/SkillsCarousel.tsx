import React from 'react';
import Marquee from 'react-fast-marquee';
import {
  SiJira,
  SiFigma,
  SiNotion,
  SiPython,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiMysql,
  SiPytorch,
  SiGooglegemini,
  SiAutodesk
} from 'react-icons/si';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  category: 'product' | 'tech' | 'ai';
}

const skills: Skill[] = [
  // Product Tools
  { name: 'Jira', icon: SiJira, color: '#0052CC', category: 'product' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E', category: 'product' },
  { name: 'Notion', icon: SiNotion, color: '#000000', category: 'product' },

  // Tech Stack
  { name: 'Python', icon: SiPython, color: '#3776AB', category: 'tech' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'tech' },
  { name: 'React', icon: SiReact, color: '#61DAFB', category: 'tech' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', category: 'tech' },
  { name: 'SQL', icon: SiMysql, color: '#4479A1', category: 'tech' },

  // AI & Automation
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', category: 'ai' },
  { name: 'Gemini', icon: SiGooglegemini, color: '#8E75B2', category: 'ai' },
  { name: 'AutoCAD API', icon: SiAutodesk, color: '#E51050', category: 'ai' },
  { name: 'Revit', icon: SiAutodesk, color: '#0696D7', category: 'ai' },
  { name: 'RhinoMCP', icon: SiAutodesk, color: '#FFD700', category: 'ai' },
];

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const Icon = skill.icon;

  return (
    <motion.div
      className="group mx-6 flex flex-col items-center justify-center transition-all duration-300"
      whileHover={{
        scale: 1.15,
        y: -8,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div
        className="mb-3 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30 relative overflow-hidden"
        style={{
          boxShadow: `0 0 0 rgba(${hexToRgb(skill.color)}, 0)`,
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
          style={{ backgroundColor: skill.color, filter: 'blur(20px)' }}
        />

        {/* Icon */}
        <Icon
          className="h-12 w-12 transition-all duration-300 relative z-10"
          style={{ color: skill.color }}
        />
      </div>
      <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
};

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
};

const SkillsCarousel: React.FC = () => {
  return (
    <section
      className="py-20 px-6 relative overflow-hidden bg-black"
      id="skills"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse" />

      <motion.div
        className="w-full max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        {/* Animated Marquees */}
        <div className="relative mb-8">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* First Row - Product Tools + Tech Stack */}
          <Marquee
            gradient={false}
            speed={40}
            pauseOnHover={true}
            className="py-8"
          >
            {skills.slice(0, 8).map((skill, index) => (
              <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index} />
            ))}
          </Marquee>

          {/* Second Row - AI & Automation (reverse direction) */}
          <Marquee
            gradient={false}
            speed={35}
            direction="right"
            pauseOnHover={true}
            className="py-8"
          >
            {skills.slice(8).map((skill, index) => (
              <SkillCard key={`${skill.name}-reverse-${index}`} skill={skill} index={index} />
            ))}
          </Marquee>
        </div>

        {/* Summary */}
        <motion.p
          className="text-base md:text-lg text-gray-400 text-center max-w-3xl mx-auto italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          "Blending engineering precision with product vision to build data-driven, scalable solutions."
        </motion.p>

        {/* Hover hint */}
        <motion.p
          className="text-xs text-gray-500 text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Hover to pause • Continuously learning new technologies
        </motion.p>
      </motion.div>
    </section>
  );
};

export default SkillsCarousel;
