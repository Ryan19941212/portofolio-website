import React from 'react';
import { motion } from 'framer-motion';

interface Algo {
  id: string;
  lab: string;
  name: string;
  category: string;
  summary: string;
  details: string;
}

const algorithms: Algo[] = [
  {
    id: 'aeb',
    lab: 'LAB_02',
    name: 'Automatic Emergency Braking',
    category: 'SAFETY',
    summary: 'Vectorized iTTC across every LiDAR beam.',
    details:
      'Computes instantaneous Time-to-Collision per beam with NumPy. Publishes brake commands to Ackermann mux (priority 200) and directly to VESC as redundant failsafe.',
  },
  {
    id: 'wall',
    lab: 'LAB_03',
    name: 'PID Wall Following',
    category: 'CONTROL',
    summary: 'Two-beam wall angle estimate + PD controller.',
    details:
      'Uses 90° and 45° LiDAR beams to estimate wall angle α. 1m lookahead projects lateral error. PD controller (Kp=0.8, Kd=0.2) converts error → steering.',
  },
  {
    id: 'gap',
    lab: 'LAB_04',
    name: 'Follow the Gap',
    category: 'REACTIVE',
    summary: 'Map-free reactive planner in steerable FOV.',
    details:
      'Clip + smooth ranges, find closest obstacle in ±24° FOV, zero out dynamic safety bubble (scales with proximity), steer toward midpoint of widest gap.',
  },
  {
    id: 'pp',
    lab: 'LAB_05',
    name: 'Pure Pursuit',
    category: 'TRACKING',
    summary: 'Geometric path tracker over CSV waypoints.',
    details:
      'Finds first waypoint ≥ Ld ahead, transforms to vehicle frame, applies pure pursuit law: γ = 2y/Ld², steering = atan(L·γ). Speed modulated by curvature.',
  },
  {
    id: 'rrt',
    lab: 'LAB_06',
    name: 'RRT*',
    category: 'PLANNING',
    summary: 'Sampling-based replanning over occupancy grid.',
    details:
      'LiDAR → 0.1m/cell occupancy grid (9×10m vehicle-frame window). RRT* with 300 iter, 0.3m step, 0.8m rewire radius, 15% goal bias. Path tracked by Pure Pursuit.',
  },
  {
    id: 'mpc',
    lab: 'LAB_08',
    name: 'Model Predictive Control',
    category: 'OPTIMIZATION',
    summary: 'Receding-horizon QP with CVXPY.',
    details:
      'State [x,y,v,yaw] · Input [accel, δ_rate]. Horizon: 8 steps × 0.1s. Cost Q = diag([13.5, 13.5, 5.5, 13.0]). Warm-started from prior solution.',
  },
];

const hardware = [
  { label: 'COMPUTE',    value: 'Jetson Orin Nano',  spec: 'arm64 · JetPack 6 · L4T R36.4' },
  { label: 'LIDAR',      value: 'RPLIDAR A2M12',     spec: '8m range · 15Hz · 360°' },
  { label: 'MOTOR_ECU',  value: 'VESC 60_MK6',       spec: 'Custom firmware · release_6_06' },
  { label: 'RUNTIME',    value: 'ROS 2 Humble',      spec: 'Ubuntu 22.04 · DDS' },
];

const demos = [
  { id: 'QS4dnrDDZss', name: 'Follow the Gap',   algo: 'REACTIVE' },
  { id: 'SXXCBjzrh3A', name: 'PID Wall Follow',  algo: 'CONTROL' },
  { id: 'UPQ4lJBQnXI', name: 'Manual Teleop',    algo: 'BASELINE' },
];

const F1TenthShowcase: React.FC = () => {
  return (
    <section
      id="f1tenth"
      className="relative bg-ink-950 py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-80" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-nv-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-nv-500" />
            <span className="tech-label text-nv-500">FEATURED_PROJECT / 01</span>
          </div>
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="font-display font-bold text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[96px] mb-4">
                F1<span className="text-nv-500">/</span>TENTH
              </h2>
              <p className="text-lg md:text-xl text-ink-200 max-w-2xl leading-relaxed">
                Six autonomous driving algorithms, built from scratch on a
                1/10-scale race car — from reactive control to model predictive
                control, deployed on ROS 2 and NVIDIA Jetson.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 font-mono text-[10px] uppercase tracking-[0.18em] space-y-1 text-ink-300">
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-ink-500">ALGORITHMS</span>
                <span className="text-white">06</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-ink-500">RUNTIME</span>
                <span className="text-white">ROS_2_HUMBLE</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-ink-500">PLATFORM</span>
                <span className="text-white">JETSON_ORIN_NANO</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-ink-500">LANG</span>
                <span className="text-white">PY · C++</span>
              </div>
            </div>
          </div>
          <a
            href="https://github.com/Ryan19941212/F1tenth"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 border border-white/15 hover:border-nv-500 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-200 hover:text-nv-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Ryan19941212/F1tenth
            <span className="text-ink-500">→</span>
          </a>
        </motion.div>

        {/* Hardware BOM strip */}
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="tech-label">▪ HARDWARE_STACK</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {hardware.map((hw, i) => (
              <motion.div
                key={hw.label}
                className="bg-ink-900 p-5 group hover:bg-ink-800 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="tech-label-sm mb-2">{hw.label}</div>
                <div className="text-white font-medium text-sm md:text-base">{hw.value}</div>
                <div className="mt-1 font-mono text-[10px] text-ink-500 group-hover:text-nv-500 transition-colors">
                  {hw.spec}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 6 algorithms grid */}
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="tech-label">▪ ALGORITHM_STACK</span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-[10px] text-ink-500">06 / MODULES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {algorithms.map((algo, i) => (
              <motion.div
                key={algo.id}
                className="group relative bg-ink-900 p-6 hover:bg-ink-800 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Hover accent bar */}
                <div className="absolute top-0 left-0 h-px bg-nv-500 w-0 group-hover:w-full transition-all duration-500" />

                <div className="flex items-start justify-between mb-4">
                  <div className="tech-label-sm text-nv-500">{algo.lab}</div>
                  <div className="tech-label-sm">{algo.category}</div>
                </div>

                <h3 className="text-white font-display font-semibold text-xl mb-2">
                  {algo.name}
                </h3>
                <p className="text-nv-500/80 text-sm mb-4 font-mono">
                  {algo.summary}
                </p>
                <p className="text-ink-300 text-sm leading-relaxed">
                  {algo.details}
                </p>

                {/* Number watermark */}
                <div className="absolute bottom-4 right-5 font-mono text-4xl text-white/[0.04] font-bold">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System architecture ASCII */}
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="tech-label">▪ SYSTEM_ARCHITECTURE</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="bg-ink-900 border border-white/5 overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-ink-800">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-nv-500" />
              </div>
              <div className="flex-1 text-center font-mono text-[10px] text-ink-500">
                f1tenth_ws/architecture.diagram
              </div>
            </div>

            <pre className="p-4 sm:p-6 font-mono text-[11px] sm:text-xs text-ink-200 leading-relaxed overflow-x-auto">
{`
    [ /scan ] LiDAR ─────────────────────────────────┐
                                                      │
                                                      ▼
    [ /odom ] Odometry ──► ┌────────────────────────────────┐
                           │  SAFETY NODE (AEB)             │
                           │  iTTC < threshold → brake      │
                           └───────┬───────────┬────────────┘
                                   │ prio 200  │ redundant
                                   ▼           ▼
    [ /joy ] Joystick ──► ┌────────────────┐  ┌────────┐
                           │ Ackermann Mux │─►│  VESC  │─► steering + throttle
                           │  200 > 100 > 10│  │        │
    [ planner ] ─────────► └────────────────┘  └────────┘
        wall_follow
        gap_follow          SAFETY ALWAYS PRE-EMPTS AUTONOMY
        pure_pursuit
        rrt_star
        mpc
`}
            </pre>
          </div>

          <p className="mt-4 font-mono text-[11px] text-ink-500">
            // Priority-based Ackermann mux ensures AEB (priority 200) overrides
            any autonomous algorithm (priority 10) in case of imminent collision.
          </p>
        </motion.div>

        {/* Demo videos grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="tech-label">▪ LIVE_DEMO_FEED</span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-[10px] text-ink-500">03 / CAPTURES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {demos.map((demo, i) => (
              <motion.div
                key={demo.id}
                className="group relative bracket-frame bg-ink-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute -top-3 left-4 z-10 px-2 bg-ink-950">
                  <span className="tech-label text-nv-500">● CH_{String(i + 1).padStart(2, '0')}</span>
                </div>

                <div className="relative aspect-video overflow-hidden">
                  <div className="scanlines absolute inset-0" />
                  <iframe
                    src={`https://www.youtube.com/embed/${demo.id}`}
                    title={demo.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    style={{ border: 0 }}
                  />
                </div>

                <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-white text-sm font-medium">{demo.name}</div>
                    <div className="font-mono text-[10px] text-ink-500">{demo.algo}</div>
                  </div>
                  <div className="font-mono text-[10px] text-nv-500">REC</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default F1TenthShowcase;
