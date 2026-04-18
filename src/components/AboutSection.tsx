import React from 'react';
import { motion } from 'framer-motion';

interface TimelineNode {
  id: string;
  year: string;
  role: string;
  org: string;
  tag: string;
  summary: string;
  bullets: string[];
}

const timeline: TimelineNode[] = [
  {
    id: '01',
    year: '2026 – now',
    role: 'Robotics Product',
    org: 'UCLA Mobility Lab · Autonomy',
    tag: 'SHIP',
    summary:
      'Closing the loop — applying product thinking to the field I love most. Building autonomous systems end-to-end so the specs I write and the trade-offs I negotiate come from real hardware, not slides.',
    bullets: [
      'RoboRacer (formerly F1TENTH) autonomous racing stack on Jetson + ROS 2',
      'Implemented 6 algorithms end-to-end: AEB, wall follow, gap follow, pure pursuit, RRT*, MPC',
      'Targeting robotics / autonomy PM — deep autonomy + sim fluency',
    ],
  },
  {
    id: '02',
    year: '2025 – 2027',
    role: 'MBA · UCLA Anderson',
    org: 'Technology Management',
    tag: 'TRANSLATE',
    summary:
      'Full-time MBA in the Technology Management track. Crossed from engineering leadership into product strategy — market sizing, customer research, roadmap trade-offs, GTM.',
    bullets: [
      'Technology Management track · Technology Immersion Program honors',
      'Startup project: Modeling.ai — AI-powered 3D modeling via MCP for AEC',
      'Closing the gap between technical feasibility and business reality',
    ],
  },
  {
    id: '03',
    year: '2025',
    role: 'AI Product Manager',
    org: 'Zendesk · James Tech Consulting · Taipei',
    tag: 'LAUNCH',
    summary:
      'First dedicated product role — shipped an AI customer-service chatbot extension on the Zendesk platform. Hands-on LLM fine-tuning, CRM integration, and cross-functional delivery.',
    bullets: [
      'Shipped AI chatbot extension → 70% support-effort reduction · 2× revenue in 5 mo',
      "Fine-tuned LLM + custom API into BenQ's CRM — saved the client $200K / month",
      'Expanded the chatbot to a new e-commerce vertical: +50% client acquisition, 70% conversion',
    ],
  },
  {
    id: '04',
    year: '2020 – 2025',
    role: 'Infrastructure PM',
    org: 'China Engineering Consultants + Taiwan Gov · Taipei',
    tag: 'BUILD',
    summary:
      '5 years managing large-scale public infrastructure — underground railways, high-rises, LNG terminals. Learned to ship where failure has real, physical consequences.',
    bullets: [
      'Managed a $3.3B underground railway · balanced 5+ stakeholders · 100% on-time',
      'Resolved a critical issue via independent data analysis — saved $1.5M, accelerated 12 mo',
      'Delivered 3+ large-scale projects · -15% execution cost · on schedule under evolving scope',
    ],
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
            <span className="tech-label text-ink-300">PROFILE / 01</span>
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl tracking-tight">
            The crossover
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 lg:gap-10 mb-20">
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-2xl md:text-3xl lg:text-[32px] text-white leading-[1.3] font-display font-medium mb-6">
              I'm a <span className="text-nv-500">Robotics Product Manager</span>{' '}
              who codes. I build the systems I ship — so the specs I write and the
              trade-offs I negotiate are grounded in what actually has to work on
              the robot.
            </p>
            <p className="text-lg md:text-xl text-ink-200 leading-relaxed max-w-2xl">
              Most PMs write requirements. Most engineers write code. I do both —
              which means when I talk about perception latency, planning horizons,
              or the cost of model predictive control, I'm not repeating jargon.
              I've debugged it at 2am on a real car.
            </p>
          </motion.div>

          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="border border-white/10 bg-ink-900/60 p-6 relative">
              <div className="absolute -top-3 left-4 px-2 bg-ink-950">
                <span className="tech-label-sm text-nv-500">● PROFILE DATA</span>
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
                  <dd className="text-white text-right">5y AI PM · Infra PM<br /><span className="text-ink-400">Civil Eng M.S.</span></dd>
                </div>
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/5">
                  <dt className="tech-label-sm">TARGET</dt>
                  <dd className="text-white text-right">Robotics / Autonomy PM</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="tech-label-sm">STATUS</dt>
                  <dd className="text-nv-500 text-right flex items-center gap-2">
                    <span className="live-dot" /> OPEN TO OPPS
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Vertical Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="tech-label">TRAJECTORY</span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-[12px] text-ink-400">
              {timeline.length + 1} NODES
            </span>
          </div>

          <div className="relative pl-6 md:pl-10">
            <div className="absolute left-[9px] md:left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-nv-500 via-nv-500/60 to-transparent" />

            <div className="space-y-10 md:space-y-14">
              {timeline.map((node, i) => (
                <motion.div
                  key={node.id}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <div className="absolute -left-6 md:-left-10 top-2 flex items-center">
                    <div className="relative flex items-center justify-center w-[18px] h-[18px] md:w-[30px] md:h-[30px]">
                      <div className="absolute inset-0 rounded-full border border-nv-500/40" />
                      <div className="absolute inset-[3px] md:inset-[5px] rounded-full bg-nv-500" />
                      <div className="absolute inset-0 rounded-full bg-nv-500/30 blur-md" />
                    </div>
                  </div>

                  <div className="group relative bg-ink-900/70 border border-white/5 hover:border-nv-500/40 transition-colors p-6 md:p-8">
                    <div className="absolute top-0 left-0 h-px bg-nv-500 w-0 group-hover:w-full transition-all duration-700" />

                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="font-mono text-[12px] text-ink-400 tracking-wider">
                        {node.id} · {node.year}
                      </span>
                      <span className="h-px flex-1 bg-white/5 min-w-[20px]" />
                      <span className="tech-label-sm text-nv-500 border border-nv-500/40 px-2 py-[2px]">
                        {node.tag}
                      </span>
                    </div>

                    <div className="font-display font-semibold text-white text-2xl md:text-3xl mb-1">
                      {node.role}
                    </div>
                    <div className="font-mono text-[13px] text-ink-400 mb-4">
                      // {node.org}
                    </div>

                    <p className="text-lg text-ink-200 leading-relaxed mb-4 max-w-3xl">
                      {node.summary}
                    </p>

                    <ul className="space-y-2">
                      {node.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 font-mono text-[13px] text-ink-300"
                        >
                          <span className="text-nv-500 mt-[2px]">›</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}

              {/* Terminal node — next step, at the bottom so history reads top-down naturally */}
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -left-6 md:-left-10 top-2 flex items-center">
                  <div className="w-[18px] h-[18px] md:w-[30px] md:h-[30px] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 border border-nv-500 rotate-45 animate-pulse" />
                  </div>
                </div>
                <div className="font-mono text-[13px] text-ink-300 pt-1">
                  {'>'} <span className="text-nv-500">AWAITING_NEXT_NODE</span> ·
                  Robotics / Autonomy PM — Summer 2026 / FT 2027_
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
