import React from 'react';

interface SkillGroup {
  category: string;
  skills: string[];
  color: string;
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Product Tools',
    skills: ['Jira', 'Figma', 'Notion'],
    color: 'from-blue-400 to-cyan-400'
  },
  {
    category: 'Tech Stack',
    skills: ['Python', 'JavaScript', 'React', 'Next.js', 'SQL'],
    color: 'from-purple-400 to-pink-400'
  },
  {
    category: 'AI & Automation',
    skills: ['PyTorch', 'Gemini', 'AutoCAD API', 'Revit', 'RhinoMCP'],
    color: 'from-orange-400 to-red-400'
  }
];

const SkillsCarousel: React.FC = () => {
  return (
    <section
      className="py-20 px-6 relative overflow-hidden bg-black"
      id="skills"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4">
          Skills
        </h2>

        {/* Summary */}
        <p className="text-base md:text-lg text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Blending engineering precision with product vision to build data-driven, scalable solutions.
        </p>

        {/* Skill Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, idx) => (
            <div
              key={group.category}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/10"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-white/10 rounded-lg text-sm text-gray-300 font-medium hover:bg-white/20 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsCarousel;
