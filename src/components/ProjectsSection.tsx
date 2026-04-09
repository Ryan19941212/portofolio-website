import React from 'react';
import { motion } from 'framer-motion';

interface Bullet {
  icon: string;
  bold: string;
  text: string;
}

interface Project {
  title: string;
  description: string;
  videoUrl: string;
  githubUrl?: string;
  bullets: Bullet[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/5 to-black" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16 pt-4 sm:pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            Featured Projects
          </h2>
        </motion.div>

        <div className="flex flex-col gap-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Project Title + GitHub link */}
              <motion.div
                className="mb-6 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                  {project.description}
                </p>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/50 transition-all duration-300 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                  </a>
                )}
              </motion.div>

              {/* Video Card */}
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
                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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

              {/* Bullets */}
              <motion.div
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 relative overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <ul className="space-y-4 relative z-10">
                  {project.bullets.map((bullet, bIndex) => (
                    <motion.li
                      key={bIndex}
                      className="flex items-start text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 + bIndex * 0.1 }}
                    >
                      <span className="text-2xl mr-3">{bullet.icon}</span>
                      <span className="text-base md:text-lg">
                        <strong className="text-white">{bullet.bold}</strong> {bullet.text}
                      </span>
                    </motion.li>
                  ))}
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
