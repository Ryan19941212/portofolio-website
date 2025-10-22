import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  videoUrl: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-32 bg-black relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/5 to-black" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          className="text-center mb-12 md:mb-16 pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Featured Project
          </h2>
        </motion.div>

        <div className="flex justify-center">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="w-full max-w-4xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Project Title */}
              <motion.div
                className="mb-6 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  RhinoMCP – AI-driven geometry generation in Rhino 3D
                </h3>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  Built an MCP integration enabling users to generate parametric buildings and bridges using natural language.
                </p>
              </motion.div>

              {/* Video Card with Enhanced Styling and Hover Effects */}
              <motion.div
                className="mb-8 rounded-3xl overflow-hidden relative group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Animated glow border on hover */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-xl" />

                {/* Solid border glow */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Video container */}
                <div className="relative z-10 rounded-3xl overflow-hidden bg-black">
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${project.videoUrl.split('/').pop()}`}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Impact Bullets */}
              <motion.div
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 relative overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Subtle gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <ul className="space-y-4 relative z-10">
                  <motion.li
                    className="flex items-start text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <span className="text-2xl mr-3">🚀</span>
                    <span className="text-base md:text-lg">
                      <strong className="text-white">Reduced manual modeling time by 80%</strong> – Automated complex parametric workflows
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <span className="text-2xl mr-3">🤖</span>
                    <span className="text-base md:text-lg">
                      <strong className="text-white">Combined LLM reasoning with 3D procedural design</strong> – Seamlessly bridged natural language and computational geometry
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <span className="text-2xl mr-3">🧩</span>
                    <span className="text-base md:text-lg">
                      <strong className="text-white">Integrated with Python and Rhino API</strong> – Built robust, production-ready tooling for architects
                    </span>
                  </motion.li>
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
