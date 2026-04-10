import React from 'react';
import { motion } from 'framer-motion';

interface Algo {
  id: string;
  lab: string;
  name: string;
  category: string;
  summary: string;
  details: string;
  params?: { k: string; v: string }[];
}

const algorithms: Algo[] = [
  {
    id: 'aeb',
    lab: 'LAB_02',
    name: 'Automatic Emergency Braking',
    category: 'SAFETY',
    summary: 'Vectorized iTTC across every LiDAR beam.',
    details:
      'Computes instantaneous Time-to-Collision per beam with NumPy. Publishes brake commands to Ackermann mux (priority 200) AND directly to VESC as redundant failsafe.',
    params: [
      { k: 'THRESH',    v: '0.5 s' },
      { k: 'PRIORITY',  v: '200' },
    ],
  },
  {
    id: 'wall',
    lab: 'LAB_03',
    name: 'PID Wall Following',
    category: 'CONTROL',
    summary: 'Two-beam wall angle estimate + PD controller.',
    details:
      'Uses 90° and 45° LiDAR beams to estimate wall angle α. 1 m lookahead projects lateral error → steering.',
    params: [
      { k: 'Kp',   v: '0.8' },
      { k: 'Kd',   v: '0.2' },
      { k: 'L',    v: '1.0 m' },
    ],
  },
  {
    id: 'gap',
    lab: 'LAB_04',
    name: 'Follow the Gap',
    category: 'REACTIVE',
    summary: 'Map-free reactive planner in steerable FOV.',
    details:
      'Clip + smooth ranges, find closest obstacle in ±24° FOV, zero out dynamic safety bubble (scales with proximity), steer toward midpoint of widest gap.',
    params: [
      { k: 'FOV',      v: '±24°' },
      { k: 'V_MAX',    v: '1.5 m/s' },
      { k: 'V_MIN',    v: '0.3 m/s' },
    ],
  },
  {
    id: 'pp',
    lab: 'LAB_05',
    name: 'Pure Pursuit',
    category: 'TRACKING',
    summary: 'Geometric path tracker over CSV waypoints.',
    details:
      'Finds first waypoint ≥ Ld ahead, transforms to vehicle frame, applies pure pursuit law: γ = 2y/Ld², δ = atan(L·γ). Speed modulated by curvature.',
    params: [
      { k: 'Ld',          v: '1.5 m' },
      { k: 'WAYPOINTS',   v: 'CSV' },
    ],
  },
  {
    id: 'rrt',
    lab: 'LAB_06',
    name: 'RRT*',
    category: 'PLANNING',
    summary: 'Sampling-based replanning over occupancy grid.',
    details:
      'LiDAR → 0.1 m/cell occupancy grid (9×10 m vehicle frame). RRT* with asymptotic optimality via rewiring. Path tracked by Pure Pursuit.',
    params: [
      { k: 'ITER',      v: '300' },
      { k: 'STEP',      v: '0.3 m' },
      { k: 'REWIRE_R',  v: '0.8 m' },
      { k: 'GOAL_BIAS', v: '15%' },
    ],
  },
  {
    id: 'mpc',
    lab: 'LAB_08',
    name: 'Model Predictive Control',
    category: 'OPTIMIZATION',
    summary: 'Receding-horizon QP with CVXPY. Warm-started.',
    details:
      'State [x, y, v, yaw] · Input [accel, δ_rate]. Horizon: 8 steps × 0.1s = 0.8s lookahead. Cost Q = diag([13.5, 13.5, 5.5, 13.0]) balances position + heading over velocity. Each solve warm-starts from the previous solution to keep the solver on the same local optimum.',
    params: [
      { k: 'HORIZON',   v: '8 × 100 ms' },
      { k: 'SOLVER',    v: 'CVXPY/OSQP' },
      { k: 'STATE_DIM', v: '4' },
      { k: 'INPUT_DIM', v: '2' },
    ],
  },
];

const hardware = [
  { label: 'COMPUTE',    value: 'Jetson Orin Nano',  spec: 'arm64 · JetPack 6 · L4T R36.4' },
  { label: 'LIDAR',      value: 'RPLIDAR A2M12',     spec: '8 m range · 15 Hz · 360°' },
  { label: 'MOTOR_ECU',  value: 'VESC 60_MK6',       spec: 'Custom FW · release_6_06' },
  { label: 'RUNTIME',    value: 'ROS 2 Humble',      spec: 'Ubuntu 22.04 · DDS' },
];

const systemSpecs = [
  { label: 'ALGORITHMS',  value: '06',          note: 'from scratch' },
  { label: 'LIDAR_HZ',    value: '15 Hz',       note: 'A2M12 scan rate' },
  { label: 'MPC_HORIZON', value: '800 ms',      note: '8 × 100 ms lookahead' },
  { label: 'GRID_RES',    value: '0.1 m/cell',  note: 'occupancy grid' },
  { label: 'SAFETY_PRIO', value: '200',         note: 'AEB mux override' },
  { label: 'CODEBASE',    value: 'Py + C++',    note: '~5k LOC, solo' },
];

const demos = [
  { id: 'QS4dnrDDZss', name: 'Follow the Gap',   algo: 'REACTIVE' },
  { id: 'SXXCBjzrh3A', name: 'PID Wall Follow',  algo: 'CONTROL' },
  { id: 'UPQ4lJBQnXI', name: 'Manual Teleop',    algo: 'BASELINE' },
];

const aebSnippet = `# Lab 2 — Vectorized iTTC across every LiDAR beam
range_rates = -self.speed * np.cos(angles)
ttc         = ranges / np.maximum(range_rates, 1e-6)

# Any beam closing faster than the threshold → brake.
if ttc[range_rates > 0].min() < TTC_THRESHOLD:
    self.publish_brake()  # prio 200 → overrides all autonomy`;

const mpcSnippet = `# Lab 8 — MPC cost with warm-start
Q  = np.diag([13.5, 13.5, 5.5, 13.0])  # x, y, v, yaw
R  = np.diag([0.01, 100.0])            # accel, steering_rate

cost = 0
for k in range(HORIZON):                # 8 × 0.1s = 0.8s lookahead
    state_err = x[:, k] - ref[:, k]
    cost     += cvxpy.quad_form(state_err, Q)
    cost     += cvxpy.quad_form(u[:, k],    R)

# Warm-start from previous solution → faster convergence
prob.solve(solver=cvxpy.OSQP, warm_start=True)`;

const decisionNotes = [
  {
    n: '01',
    title: 'Why RRT* over plain RRT?',
    body: "Plain RRT finds a path fast but rarely an optimal one. The *rewire* step in RRT* gives asymptotic optimality for a bounded cost per iteration — worth it on a 1/10 car where compute isn't the bottleneck but path quality matters for lap time.",
  },
  {
    n: '02',
    title: 'Why a 0.8 s MPC horizon, not longer?',
    body: 'Longer horizons look smarter on paper but explode solver time and over-commit to a stale prediction in a reactive environment. 8 × 100 ms hits the sweet spot: long enough to anticipate corners, short enough that the warm-start is still relevant next tick.',
  },
  {
    n: '03',
    title: 'Why redundant AEB (mux + direct-to-VESC)?',
    body: "The Ackermann mux is clean in theory but adds a failure point. If the mux crashes or lags, the car keeps whatever velocity it last had. Publishing the brake directly to VESC gives a second independent path — safety-critical code shouldn't have a single point of failure.",
  },
];

const RoboRacerShowcase: React.FC = () => {
  return (
    <section
      id="roboracer"
      className="relative bg-ink-950 py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-80" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-nv-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-nv-500" />
            <span className="tech-label text-nv-500">FEATURED_PROJECT / 02</span>
            <span className="tech-label-sm text-ink-400 hidden sm:inline">
              · formerly F1TENTH
            </span>
          </div>
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="font-display font-bold text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[96px] mb-5">
                Robo<span className="text-nv-500">/</span>Racer
              </h2>
              <p className="text-lg md:text-xl text-ink-100 max-w-2xl leading-relaxed mb-5">
                Six autonomous driving algorithms, built{' '}
                <span className="text-nv-500 font-semibold">solo from scratch</span>{' '}
                on a 1/10-scale race car — from reactive control to model
                predictive control — running ROS 2 on NVIDIA Jetson.
              </p>
              <p className="text-base md:text-lg text-ink-300 max-w-2xl leading-relaxed">
                Most PMs write requirements. I wrote these six algorithms — from
                scratch, on a real race car —{' '}
                <span className="text-white">
                  so the roadmap trade-offs I make come from actually debugging
                  them at 2am
                </span>
                , not from a textbook.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 font-mono text-[12px] uppercase tracking-[0.16em] space-y-1 text-ink-200">
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-ink-400">RUNTIME</span>
                <span className="text-white">ROS_2_HUMBLE</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-ink-400">PLATFORM</span>
                <span className="text-white">JETSON_ORIN_NANO</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span className="text-ink-400">LANG</span>
                <span className="text-white">PY · C++</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-ink-400">ROLE</span>
                <span className="text-nv-500">SOLO_BUILD</span>
              </div>
            </div>
          </div>
          <a
            href="https://github.com/Ryan19941212/F1tenth"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 border border-white/15 hover:border-nv-500 px-4 py-2.5 font-mono text-[13px] uppercase tracking-[0.16em] text-ink-100 hover:text-nv-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Ryan19941212/F1tenth
            <span className="text-ink-400">→</span>
          </a>
        </motion.div>

        {/* TL;DR strip — for recruiters who only have 30 seconds */}
        <motion.div
          className="mb-12 lg:mb-16 border border-nv-500/30 bg-ink-900/60 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-3 left-4 px-2 bg-ink-950">
            <span className="tech-label text-nv-500">▸ TL;DR / 30 SEC</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5">
            <div className="bg-ink-900 p-5">
              <div className="tech-label-sm mb-2">WHAT</div>
              <div className="text-white text-sm leading-relaxed">
                A 1/10-scale autonomous race car I built end-to-end — from
                firmware up to motion planning.
              </div>
            </div>
            <div className="bg-ink-900 p-5">
              <div className="tech-label-sm mb-2">WHY IT MATTERS</div>
              <div className="text-white text-sm leading-relaxed">
                Proves I can do the robotics work I'm asking to manage.
                Hiring managers don't guess.
              </div>
            </div>
            <div className="bg-ink-900 p-5">
              <div className="tech-label-sm mb-2">STACK</div>
              <div className="text-white text-sm leading-relaxed">
                ROS 2 · NVIDIA Jetson · C++/Python · LiDAR perception ·
                MPC control.
              </div>
            </div>
            <div className="bg-ink-900 p-5">
              <div className="tech-label-sm mb-2">SCOPE</div>
              <div className="text-white text-sm leading-relaxed">
                6 algorithms · ~5k LOC · solo build · real hardware + sim ·
                2025 – 2026.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero image + system specs strip */}
        <motion.div
          className="mb-16 lg:mb-20 grid grid-cols-12 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="col-span-12 lg:col-span-7 relative bracket-frame bg-ink-900">
            <div className="absolute -top-3 left-4 z-10 px-2 bg-ink-950">
              <span className="tech-label text-nv-500">● REAL_HARDWARE</span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="scanlines absolute inset-0 z-10 opacity-40" />
              <img
                src="/f1tenth-hero.jpg"
                alt="RoboRacer (formerly F1TENTH) 1/10-scale autonomous race car"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Corner HUD overlay */}
              <div className="absolute top-4 left-4 font-mono text-[12px] text-nv-500 tracking-[0.18em] z-20">
                ● LIVE
              </div>
              <div className="absolute top-4 right-4 font-mono text-[12px] text-white/80 tracking-[0.18em] z-20">
                CAM_01
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-[12px] text-white/80 tracking-[0.18em] z-20">
                ROBORACER / LAB_CAR
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label">▪ SYSTEM_PARAMS</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 flex-1">
              {systemSpecs.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="bg-ink-900 p-4 flex flex-col justify-between"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div className="tech-label-sm mb-2">{s.label}</div>
                  <div>
                    <div className="font-display font-bold text-white text-xl sm:text-2xl">
                      {s.value}
                    </div>
                    <div className="font-mono text-[12px] text-ink-400 mt-1">
                      {s.note}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="font-mono text-[12px] text-ink-400 mt-3">
              // Parameters tuned on real hardware, not simulation defaults
            </p>
          </div>
        </motion.div>

        {/* Sim-to-real story callout */}
        <motion.div
          className="mb-16 lg:mb-20 relative border border-nv-500/30 bg-ink-900/60 p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-3 left-4 px-2 bg-ink-950">
            <span className="tech-label text-nv-500">● FIELD_NOTE / SIM_TO_REAL</span>
          </div>
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 md:col-span-8">
              <h3 className="font-display font-semibold text-white text-xl sm:text-2xl mb-3">
                The servo died. I rebuilt the firmware.
              </h3>
              <p className="text-ink-100 leading-relaxed mb-3">
                Halfway through Lab 5, the steering servo on the real car stopped
                responding. The default VESC 6.06 firmware shipped for 60_MK6 had
                a broken servo output path — and the RoboRacer (formerly
                F1TENTH) pre-built binaries only covered MKIII/MKV/PLUS/FLIPSKY.
                No MK6.
              </p>
              <p className="text-ink-200 leading-relaxed">
                So I kept developing in AutoDRIVE sim for the algorithm work, and
                in parallel built VESC firmware from source off the{' '}
                <span className="font-mono text-nv-500">release_6_06</span> branch
                for the MK6 target using a Docker cross-compile. Flashed via
                Custom File tab → servo alive → back on real hardware.{' '}
                <span className="text-white font-medium">
                  Robotics is half writing controllers, half knowing when to drop
                  a level of the stack.
                </span>
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 font-mono text-[12px] space-y-2">
              <div className="tech-label-sm mb-3">DEBUG_LOG</div>
              <div className="border-l-2 border-nv-500/60 pl-3 py-1">
                <div className="text-ink-400">01</div>
                <div className="text-white">Servo dead on MK6</div>
              </div>
              <div className="border-l-2 border-nv-500/60 pl-3 py-1">
                <div className="text-ink-400">02</div>
                <div className="text-white">Pivot to AutoDRIVE sim</div>
              </div>
              <div className="border-l-2 border-nv-500/60 pl-3 py-1">
                <div className="text-ink-400">03</div>
                <div className="text-white">Build FW from source</div>
              </div>
              <div className="border-l-2 border-nv-500 pl-3 py-1">
                <div className="text-ink-400">04</div>
                <div className="text-nv-500">Flash · back online ✓</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hardware BOM strip */}
        <motion.div
          className="mb-16 lg:mb-20"
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
                <div className="mt-1 font-mono text-[12px] text-ink-400 group-hover:text-nv-500 transition-colors">
                  {hw.spec}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 6 algorithms grid with MPC featured */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="tech-label">▪ ALGORITHM_STACK</span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-[12px] text-ink-400">06 / MODULES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {algorithms.slice(0, 5).map((algo, i) => (
              <AlgoCard key={algo.id} algo={algo} index={i} />
            ))}
            {/* MPC - featured (2 cols) */}
            <motion.div
              className="md:col-span-2 lg:col-span-3 group relative bg-ink-900 p-6 sm:p-8 hover:bg-ink-800 transition-colors border-t border-nv-500/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="absolute top-0 left-0 h-px bg-nv-500 w-0 group-hover:w-full transition-all duration-700" />

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-7">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="tech-label-sm text-nv-500">{algorithms[5].lab}</span>
                    <span className="tech-label-sm">{algorithms[5].category}</span>
                    <span className="tech-label-sm text-amber-500">★ CAPSTONE</span>
                  </div>
                  <h3 className="text-white font-display font-semibold text-2xl sm:text-3xl mb-2">
                    {algorithms[5].name}
                  </h3>
                  <p className="text-nv-500/90 text-base mb-4 font-mono">
                    {algorithms[5].summary}
                  </p>
                  <p className="text-ink-100 leading-relaxed max-w-2xl">
                    {algorithms[5].details}
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-5">
                  <div className="tech-label-sm mb-3">PARAMETERS</div>
                  <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5">
                    {algorithms[5].params?.map((p) => (
                      <div key={p.k} className="bg-ink-800 p-3">
                        <div className="font-mono text-[12px] text-ink-400">{p.k}</div>
                        <div className="font-display font-semibold text-white text-base mt-1">
                          {p.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 right-8 font-mono text-6xl text-white/[0.04] font-bold">
                06
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Code snippets */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="tech-label">▪ CODE_SAMPLES</span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-[12px] text-ink-400">02 / FILES</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CodeBlock filename="safety_node/aeb.py" code={aebSnippet} />
            <CodeBlock filename="mpc/controller.py"  code={mpcSnippet} />
          </div>
        </motion.div>

        {/* Engineering decisions */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="tech-label">▪ ENGINEERING_DECISIONS</span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-[12px] text-ink-400">TRADE-OFFS</span>
          </div>
          <p className="text-ink-200 leading-relaxed max-w-3xl mb-8">
            The fun part of robotics is not writing the algorithm — it's deciding
            which one, tuned how, at what latency cost. These are three calls I
            had to make:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {decisionNotes.map((d, i) => (
              <motion.div
                key={d.n}
                className="bg-ink-900 p-6 relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="font-mono text-[12px] text-nv-500 mb-3 tracking-[0.18em]">
                  DECISION_{d.n}
                </div>
                <h4 className="font-display font-semibold text-white text-lg mb-3">
                  {d.title}
                </h4>
                <p className="text-ink-200 text-sm leading-relaxed">{d.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System architecture ASCII */}
        <motion.div
          className="mb-16 lg:mb-20"
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
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-ink-800">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-nv-500" />
              </div>
              <div className="flex-1 text-center font-mono text-[12px] text-ink-400">
                f1tenth_ws/architecture.diagram
              </div>
              <div className="hidden sm:block font-mono text-[12px] text-ink-400">
                scroll →
              </div>
            </div>
            <div className="overflow-x-auto">
              <pre className="p-4 sm:p-6 font-mono text-[12px] sm:text-[13px] text-ink-100 leading-relaxed min-w-[640px]">
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
                          │ Ackermann Mux  │─►│  VESC  │─► steering + throttle
                          │ 200 > 100 > 10 │  │        │
    [ planner ] ─────────►└────────────────┘  └────────┘
        wall_follow
        gap_follow          SAFETY ALWAYS PRE-EMPTS AUTONOMY
        pure_pursuit
        rrt_star
        mpc
`}
              </pre>
            </div>
          </div>

          <p className="mt-4 font-mono text-[13px] text-ink-400">
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
            <span className="font-mono text-[12px] text-ink-400">03 / CAPTURES</span>
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
                    src={`https://www.youtube-nocookie.com/embed/${demo.id}`}
                    title={demo.name}
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                    style={{ border: 0 }}
                  />
                </div>

                <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-white text-sm font-medium">{demo.name}</div>
                    <div className="font-mono text-[12px] text-ink-400">{demo.algo}</div>
                  </div>
                  <div className="font-mono text-[12px] text-nv-500">REC</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── sub-components ── */

const AlgoCard: React.FC<{ algo: Algo; index: number }> = ({ algo, index }) => (
  <motion.div
    className="group relative bg-ink-900 p-6 hover:bg-ink-800 transition-colors"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
  >
    <div className="absolute top-0 left-0 h-px bg-nv-500 w-0 group-hover:w-full transition-all duration-500" />

    <div className="flex items-start justify-between mb-4">
      <div className="tech-label-sm text-nv-500">{algo.lab}</div>
      <div className="tech-label-sm">{algo.category}</div>
    </div>

    <h3 className="text-white font-display font-semibold text-xl mb-2">
      {algo.name}
    </h3>
    <p className="text-nv-500/80 text-sm mb-3 font-mono">{algo.summary}</p>
    <p className="text-ink-200 text-sm leading-relaxed mb-4">{algo.details}</p>

    {algo.params && (
      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 border-t border-white/5 font-mono text-[12px]">
        {algo.params.map((p) => (
          <div key={p.k}>
            <span className="text-ink-400">{p.k}=</span>
            <span className="text-white">{p.v}</span>
          </div>
        ))}
      </div>
    )}

    <div className="absolute bottom-4 right-5 font-mono text-4xl text-white/[0.04] font-bold">
      {String(index + 1).padStart(2, '0')}
    </div>
  </motion.div>
);

const CodeBlock: React.FC<{ filename: string; code: string }> = ({
  filename,
  code,
}) => (
  <div className="bg-ink-900 border border-white/5 overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-ink-800">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-nv-500" />
      </div>
      <div className="flex-1 text-center font-mono text-[12px] text-ink-400">
        {filename}
      </div>
    </div>
    <div className="overflow-x-auto">
      <pre className="p-4 sm:p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed text-ink-100">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

export default RoboRacerShowcase;
