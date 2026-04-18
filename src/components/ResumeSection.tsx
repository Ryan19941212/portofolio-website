import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  baseUrl: string;
}

const highlights = [
  { label: 'MBA',       value: 'UCLA Anderson' },
  { label: 'ENG',       value: '5y Civil / Automation' },
  { label: 'ROBOTICS',  value: 'ROS 2 · Jetson · MPC' },
  { label: 'TARGET',    value: 'Robotics Product' },
];

const ResumeSection: React.FC<Props> = ({ baseUrl }) => {
  return (
    <section
      id="resume"
      className="relative bg-ink-950 py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint-fine opacity-50" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-nv-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-nv-500" />
            <span className="tech-label text-ink-300">RESUME / 05</span>
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4">
            Full dossier
          </h2>
          <p className="text-lg md:text-xl text-ink-200 max-w-2xl leading-relaxed">
            The complete record — experience, education, projects, and
            publications.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-12 gap-6 items-stretch"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Highlights strip */}
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5">
              {highlights.map((h) => (
                <div key={h.label} className="bg-ink-900 p-5">
                  <div className="tech-label-sm mb-2">{h.label}</div>
                  <div className="text-white text-base sm:text-lg font-medium">{h.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Download CTA card */}
          <div className="col-span-12 lg:col-span-5">
            <motion.a
              href={`${baseUrl}resume.pdf`}
              download="Ryan_Huang_Resume.pdf"
              className="group relative block h-full bracket-frame bg-ink-900/60 p-8 border border-white/5 hover:border-nv-500/60 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="absolute -top-3 left-4 px-2 bg-ink-950">
                <span className="tech-label text-nv-500">● DOWNLOAD</span>
              </div>

              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="font-display text-2xl sm:text-3xl text-white font-semibold mb-2">
                    Resume.pdf
                  </div>
                  <div className="font-mono text-[13px] text-ink-400">
                    // robotics focus · 2026 edition
                  </div>
                </div>
                <svg
                  className="w-10 h-10 text-ink-500 group-hover:text-nv-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="square" strokeWidth="1.5" d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" />
                </svg>
              </div>

              <div className="space-y-2 font-mono text-[13px] mb-8">
                <div className="flex justify-between text-ink-300">
                  <span className="text-ink-500">FORMAT</span>
                  <span>PDF</span>
                </div>
                <div className="flex justify-between text-ink-300">
                  <span className="text-ink-500">UPDATED</span>
                  <span>2026</span>
                </div>
                <div className="flex justify-between text-ink-300">
                  <span className="text-ink-500">SIZE</span>
                  <span>~125 KB</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-nv-500 group-hover:gap-5 transition-all">
                &gt; Download file
                <span>→</span>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
