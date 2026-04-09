import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  githubUrl?: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
}

interface Props {
  projects: Project[];
}

const ProjectsSection: React.FC<Props> = ({ projects }) => {
  return (
    <section
      id="projects"
      className="relative bg-ink-950 py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint-fine opacity-50" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-nv-500" />
            <span className="tech-label text-nv-500">OTHER_WORK / 02</span>
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4">
            Adjacent projects
          </h2>
          <p className="text-base md:text-lg text-ink-300 max-w-2xl">
            Side projects exploring the intersection of AI, geometry, and
            production tooling. Each one shipped to real users.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="lg:col-span-12 group relative bg-ink-900/60 border border-white/5 hover:border-nv-500/40 transition-colors overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Video */}
                <div className="lg:col-span-6 relative bg-black">
                  <div className="scanlines absolute inset-0 z-10 opacity-40" />
                  <div className="aspect-video lg:aspect-auto lg:h-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${project.videoUrl.split('/').pop()}`}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      style={{ border: 0 }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="tech-label-sm text-nv-500">
                        PROJECT_{String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <h3 className="font-display font-semibold text-white text-2xl sm:text-3xl mb-2">
                      {project.title}
                    </h3>
                    <p className="text-nv-500 font-mono text-xs mb-4">
                      {project.subtitle}
                    </p>
                    <p className="text-ink-200 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 font-mono text-[12px] uppercase tracking-wider border border-white/10 text-ink-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-white/5">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="tech-label-sm">{m.label}</div>
                            <div className="text-white font-display font-semibold text-xl mt-1">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 self-start border border-white/15 hover:border-nv-500 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.18em] text-ink-200 hover:text-nv-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      View source
                      <span>→</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
