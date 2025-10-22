import React from 'react';
import Marquee from 'react-fast-marquee';
import {
  SiOpenai,
  SiPython,
  SiCplusplus,
  SiPytorch,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiGooglegemini,
  SiAnthropic,
  SiAutodesk,
  SiJira,
  SiMysql
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: JSX.Element;
  color: string;
}

const skills: Skill[] = [
  { name: 'OpenAI', icon: <SiOpenai className="h-10 w-10 transition-all duration-300" />, color: '#00A67E' },
  { name: 'Python', icon: <SiPython className="h-10 w-10 transition-all duration-300" />, color: '#3776AB' },
  { name: 'Claude', icon: <SiAnthropic className="h-10 w-10 transition-all duration-300" />, color: '#CC9B7A' },
  { name: 'C/C++', icon: <SiCplusplus className="h-10 w-10 transition-all duration-300" />, color: '#00599C' },
  { name: 'PyTorch', icon: <SiPytorch className="h-10 w-10 transition-all duration-300" />, color: '#EE4C2C' },
  { name: 'JavaScript', icon: <SiJavascript className="h-10 w-10 transition-all duration-300" />, color: '#F7DF1E' },
  { name: 'Gemini', icon: <SiGooglegemini className="h-10 w-10 transition-all duration-300" />, color: '#8E75B2' },
  { name: 'React', icon: <SiReact className="h-10 w-10 transition-all duration-300" />, color: '#61DAFB' },
  { name: 'Next.js', icon: <SiNextdotjs className="h-10 w-10 transition-all duration-300" />, color: '#ffffff' },
  { name: 'AutoCAD', icon: <SiAutodesk className="h-10 w-10 transition-all duration-300" />, color: '#E51050' },
  { name: 'Revit', icon: <SiAutodesk className="h-10 w-10 transition-all duration-300" />, color: '#0696D7' },
  { name: 'Jira', icon: <SiJira className="h-10 w-10 transition-all duration-300" />, color: '#0052CC' },
  { name: 'SQL', icon: <SiMysql className="h-10 w-10 transition-all duration-300" />, color: '#4479A1' },
];

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <div className="group mx-6 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110">
      <div
        className="mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:shadow-lg group-hover:shadow-current"
        style={{
          '--tw-shadow-color': skill.color,
        } as React.CSSProperties}
      >
        <div style={{ color: skill.color }}>
          {skill.icon}
        </div>
      </div>
      <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
        {skill.name}
      </span>
    </div>
  );
};

const SkillsCarousel: React.FC = () => {
  return (
    <section
      className="py-16 pb-20 px-6 relative overflow-hidden bg-black"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Skills
        </h2>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Scrolling Skills */}
          <Marquee
            gradient={false}
            speed={40}
            pauseOnHover={true}
            className="py-8"
          >
            {skills.map((skill, index) => (
              <SkillCard key={`${skill.name}-${index}`} skill={skill} />
            ))}
          </Marquee>
        </div>

        {/* Optional: Add a decorative element */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Hover to pause • Continuously learning new technologies
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsCarousel;
