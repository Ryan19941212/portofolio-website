import React from 'react';
import { motion } from 'framer-motion';

const timeline = [
  {
    year: '2018 – 2023',
    role: 'Civil Engineer',
    org: 'Infrastructure · Automation',
    summary: 'Built the physical world — underground railways, LNG terminals, high-rises. Learned to ship projects where failure has real consequences.',
  },
  {
    year: '2023 – 2025',
    role: 'MBA · UCLA Anderson',
    org: 'Product Strategy',
    summary: 'Crossed over to product. Learned the business of shipping software — market sizing, customer research, roadmap tradeoffs.',
  },
  {
    year: '2025 – now',
    role: 'Robotics Product',
    org: 'Autonomy · AI Systems',
    summary: 'Closing the loop — applying MBA product thinking to the field I love most. Building autonomous systems end-to-end to understand what I ship.',
  },
];

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative bg-ink-950 py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint-fine opacity-50" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-nv-500/5 rounded-full blur-[120px]" />

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
            <span className="tech-label text-nv-500">PROFILE / 04</span>
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl tracking-tight">
            The crossover
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-16">
          {/* Lead statement */}
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-white leading-[1.3] font-display font-medium mb-6">
              I'm a <span className="text-nv-500">Robotics Product Manager</span>{' '}
              who codes. I build the systems I ship — so the specs I write and the
              trade-offs I negotiate are grounded in what actually has to work on
              the robot.
            </p>
            <p className="text-base md:text-lg text-ink-300 leading-relaxed max-w-2xl">
              Most PMs write requirements. Most engineers write code. I do both —
              which means when I talk about perception latency, planning horizons,
              or the cost of model predictive control, I'm not repeating jargon.
              I've debugged it at 2am on a real car.
            </p>
          </motion.div>

          {/* Data card */}
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bracket-frame bg-ink-900/60 p-6 relative">
              <div className="absolute -top-3 left-4 px-2 bg-ink-950">
                <span className="tech-label text-nv-500">● PROFILE_DATA</span>
              </div>

              <dl className="space-y-4 mt-2 font-mono text-xs">
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/5">
                  <dt className="tech-label-sm">LOCATION</dt>
                  <dd className="text-white text-right">Los Angeles, CA</dd>
                </div>
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/5">
                  <dt className="tech-label-sm">MBA</dt>
                  <dd className="text-white text-right">UCLA Anderson<br /><span className="text-ink-400">Class of 2027</span></dd>
                </div>
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/5">
                  <dt className="tech-label-sm">BACKGROUND</dt>
                  <dd className="text-white text-right">5y Civil Engineering<br /><span className="text-ink-400">Automation · Infra</span></dd>
                </div>
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/5">
                  <dt className="tech-label-sm">TARGET</dt>
                  <dd className="text-nv-500 text-right">NVIDIA Robotics</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="tech-label-sm">STATUS</dt>
                  <dd className="text-amber-500 text-right flex items-center gap-2">
                    <span className="live-dot" /> OPEN TO OPPS
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="tech-label">▪ TRAJECTORY</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className="group relative bg-ink-900 p-6 hover:bg-ink-800 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <div className="absolute top-0 left-0 h-px bg-nv-500 w-0 group-hover:w-full transition-all duration-700" />

                <div className="font-mono text-[10px] text-nv-500 mb-3 tracking-wider">
                  {String(i + 1).padStart(2, '0')} · {item.year}
                </div>
                <div className="font-display font-semibold text-white text-xl mb-1">
                  {item.role}
                </div>
                <div className="font-mono text-[11px] text-ink-400 mb-4">
                  {item.org}
                </div>
                <p className="text-sm text-ink-300 leading-relaxed">
                  {item.summary}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
