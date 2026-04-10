import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-ink-950 overflow-hidden pt-16"
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint opacity-60" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(5,6,10,0.85)_80%)]" />
      {/* Accent gradient bloom */}
      <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-nv-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-nv-500/5 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        {/* Top telemetry bar */}
        <motion.div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 font-mono text-[12px] uppercase tracking-[0.2em] text-ink-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <span className="live-dot" />
            <span className="text-ink-200">SYS_ONLINE</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-ink-400">TARGET::</span>
            <span className="text-nv-500">NVIDIA_ROBOTICS</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-ink-400">LOC::</span>
            <span>LOS_ANGELES</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-ink-400">STATUS::</span>
            <span className="text-amber-500">OPEN_TO_OPPS</span>
          </div>
          <a
            href="#resume"
            className="ml-auto inline-flex items-center gap-2 border border-nv-500/40 hover:bg-nv-500 hover:text-ink-950 text-nv-500 px-3 py-1.5 transition-colors"
          >
            <span>RESUME</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth="2" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
            </svg>
          </a>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left: Identity + value prop */}
          <div className="col-span-12 lg:col-span-7 relative">
            {/* Corner bracket */}
            <div className="absolute -top-4 -left-2 w-4 h-4 border-t border-l border-nv-500/60" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="tech-label mb-4">
                <span className="text-nv-500">◆</span> IDENTITY / 01
              </div>

              <h1 className="font-display font-bold leading-[0.95] tracking-tight text-white mb-6">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px]">
                  Ryan Huang
                </span>
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 text-ink-100 font-medium">
                  Robotics Product Manager
                </span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl text-white leading-[1.25] max-w-2xl mb-4 font-display font-medium">
                I build the robots{' '}
                <span className="text-nv-500">I ship specs for.</span>
              </p>
              <p className="text-base md:text-lg text-ink-200 leading-relaxed max-w-xl mb-3">
                UCLA Anderson MBA · 5+ years across AI product management,
                infrastructure PM, and hands-on robotics. Most PMs translate
                between product and engineering — I already speak both. When I
                write a spec, I've already debugged the code.
              </p>
              <p className="font-mono text-[13px] text-ink-500 mb-8 max-w-xl">
                $ ships_product ={' '}
                <span className="text-nv-500">writes_code()</span>
                <span className="text-nv-500 animate-pulse">_</span>
              </p>

              {/* EXECUTIVE SUMMARY — recruiter-friendly data card */}
              <div className="mb-10 border border-white/10 bg-ink-900/60 relative">
                <div className="absolute -top-3 left-4 px-2 bg-ink-950">
                  <span className="tech-label text-nv-500">● EXECUTIVE_SUMMARY</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/5">
                  <div className="bg-ink-900 p-4">
                    <div className="tech-label-sm mb-2">MBA</div>
                    <div className="text-white text-sm font-medium leading-snug">
                      UCLA Anderson
                    </div>
                    <div className="font-mono text-[12px] text-ink-400 mt-1">
                      Class of 2027
                    </div>
                  </div>
                  <div className="bg-ink-900 p-4">
                    <div className="tech-label-sm mb-2">EXPERIENCE</div>
                    <div className="text-white text-sm font-medium leading-snug">
                      5+ yrs
                    </div>
                    <div className="font-mono text-[12px] text-ink-400 mt-1">
                      PM · AI · Infra
                    </div>
                  </div>
                  <div className="bg-ink-900 p-4">
                    <div className="tech-label-sm mb-2">LOCATION</div>
                    <div className="text-white text-sm font-medium leading-snug">
                      Los Angeles
                    </div>
                    <div className="font-mono text-[12px] text-ink-400 mt-1">
                      Open to relocate
                    </div>
                  </div>
                  <div className="bg-ink-900 p-4">
                    <div className="tech-label-sm mb-2">AVAILABLE</div>
                    <div className="text-white text-sm font-medium leading-snug">
                      Summer 2026
                    </div>
                    <div className="font-mono text-[12px] text-ink-400 mt-1">
                      FT: 2027
                    </div>
                  </div>
                  <a
                    href="#resume"
                    className="group bg-ink-900 p-4 hover:bg-nv-500 hover:text-ink-950 transition-colors block col-span-2 md:col-span-1"
                  >
                    <div className="tech-label-sm mb-2 group-hover:text-ink-950">RESUME</div>
                    <div className="text-nv-500 group-hover:text-ink-950 text-sm font-medium leading-snug flex items-center gap-2">
                      Download PDF
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeWidth="2" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                      </svg>
                    </div>
                    <div className="font-mono text-[12px] text-ink-400 group-hover:text-ink-900 mt-1">
                      ~125 KB · 2026
                    </div>
                  </a>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
                <motion.a
                  href="#roboracer"
                  className="group relative inline-flex items-center justify-center gap-3 px-6 py-4 bg-nv-500 text-ink-950 font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-nv-400 transition-colors"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>&gt; See RoboRacer project</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth="2" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#resume"
                  className="group inline-flex items-center justify-center gap-3 px-6 py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-[0.2em] hover:border-nv-500 hover:text-nv-500 transition-colors"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Download resume</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth="2" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                  </svg>
                </motion.a>
              </div>

              {/* Looking for block */}
              <div className="relative border-l-2 border-nv-500/60 pl-4 py-1 max-w-xl">
                <div className="tech-label-sm mb-2 text-nv-500">▸ SEEKING / 2026</div>
                <div className="font-mono text-[13px] text-ink-200 leading-relaxed">
                  <span className="text-white">Robotics / Autonomy PM</span> roles —
                  <span className="text-ink-300"> perception, planning, control, simulation.</span>
                  <br />
                  <span className="text-ink-400">// Built for NVIDIA Robotics · Isaac · Jetson · Drive</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Featured asset — RoboRacer hero image + telemetry overlay */}
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              className="relative bracket-frame bg-ink-900/60 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Top label */}
              <div className="absolute -top-3 left-4 z-10 px-2 bg-ink-950">
                <span className="tech-label text-nv-500">● LIVE_FEED / ROBORACER</span>
              </div>

              {/* RoboRacer hero feed */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="scanlines absolute inset-0 pointer-events-none" />
                <div className="scan-sweep absolute inset-0 pointer-events-none" />
                <iframe
                  src="https://www.youtube.com/embed/QS4dnrDDZss?autoplay=1&mute=1&loop=1&playlist=QS4dnrDDZss&controls=0&modestbranding=1"
                  title="RoboRacer Autonomous Racing"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full"
                  style={{ border: 0 }}
                />
              </div>

              {/* Bottom telemetry strip */}
              <div className="border-t border-white/10 px-4 py-3 grid grid-cols-3 gap-2 font-mono text-[12px]">
                <div>
                  <div className="tech-label-sm">ALGO</div>
                  <div className="text-nv-500 mt-1">GAP_FOLLOW</div>
                </div>
                <div>
                  <div className="tech-label-sm">SPEED</div>
                  <div className="text-white mt-1">1.5 m/s</div>
                </div>
                <div>
                  <div className="tech-label-sm">STATUS</div>
                  <div className="text-amber-500 mt-1">NOMINAL</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-3 font-mono text-[12px] text-ink-400 text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              // 1/10-scale autonomous race car · ROS 2 Humble · Jetson Orin Nano
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink-400">
            Scroll / Explore
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-nv-500 to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
