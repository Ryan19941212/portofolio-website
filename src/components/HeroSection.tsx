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
                <span className="block text-base sm:text-lg md:text-xl mt-3 font-mono text-nv-500 tracking-wide">
                  <span className="text-ink-500">$</span> ships_product ={' '}
                  <span className="text-white">writes_code()</span>
                  <span className="text-nv-500 animate-pulse">_</span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-ink-100 leading-relaxed max-w-xl mb-4 font-medium">
                I don't translate between PMs and engineers.{' '}
                <span className="text-nv-500">I am both.</span>
              </p>
              <p className="text-base text-ink-300 leading-relaxed max-w-xl mb-8">
                UCLA Anderson MBA + 5y engineering. I ship the{' '}
                <span className="text-white font-medium">perception, planning, and control</span>{' '}
                stacks I write specs for — so the trade-offs I negotiate are the
                ones I've already debugged on real hardware at 2am.
              </p>

              {/* Key credentials as horizontal data strip */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10 font-mono text-xs">
                <div>
                  <div className="tech-label-sm mb-1">EDU</div>
                  <div className="text-ink-100">UCLA Anderson MBA</div>
                </div>
                <div className="hidden sm:block w-px bg-white/10" />
                <div>
                  <div className="tech-label-sm mb-1">BACKGROUND</div>
                  <div className="text-ink-100">5y Civil Eng / Automation</div>
                </div>
                <div className="hidden sm:block w-px bg-white/10" />
                <div>
                  <div className="tech-label-sm mb-1">FOCUS</div>
                  <div className="text-nv-500">Autonomous Robotics</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
                <motion.a
                  href="#f1tenth"
                  className="group relative inline-flex items-center justify-center gap-3 px-6 py-4 bg-nv-500 text-ink-950 font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-nv-400 transition-colors"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>&gt; See F1TENTH project</span>
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

          {/* Right: Featured asset — F1Tenth hero image + telemetry overlay */}
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              className="relative bracket-frame bg-ink-900/60 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Top label */}
              <div className="absolute -top-3 left-4 z-10 px-2 bg-ink-950">
                <span className="tech-label text-nv-500">● LIVE_FEED / F1TENTH</span>
              </div>

              {/* F1tenth hero image - we'll use the YouTube thumbnail as a placeholder for the featured asset */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="scanlines absolute inset-0" />
                <div className="scan-sweep absolute inset-0" />
                <iframe
                  src="https://www.youtube.com/embed/QS4dnrDDZss?autoplay=1&mute=1&loop=1&playlist=QS4dnrDDZss&controls=0&modestbranding=1"
                  title="F1TENTH Autonomous Racing"
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
