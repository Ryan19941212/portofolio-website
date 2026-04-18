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
    body: "Plain RRT finds a path fast but rarely an optimal one. The rewire step in RRT* gives asymptotic optimality for a bounded cost per iteration — worth it on a 1/10 car where compute isn't the bottleneck but path quality matters for lap time.",
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
      className="relative bg-ink-950 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
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
            <span className="tech-label text-ink-300">FEATURED PROJECT / 02</span>
            <span className="tech-label-sm text-ink-500 hidden sm:inline">
              · formerly F1TENTH
            </span>
          </div>
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="font-display font-bold text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[96px] mb-6">
                Robo<span className="text-nv-500">/</span>Racer
              </h2>
              <p className="text-xl md:text-2xl text-white max-w-2xl leading-relaxed mb-5 font-display font-medium">
                Six autonomous driving algorithms, built{' '}
                <span className="text-nv-500">solo from scratch</span>{' '}
                on a 1/10-scale race car.
              </p>
              <p className="text-lg md:text-xl text-ink-200 max-w-2xl leading-relaxed">
                From reactive control to model predictive control — running ROS 2
                on NVIDIA Jetson. Most PMs write requirements. I wrote these six
                algorithms, so the roadmap trade-offs I make come from actually
                debugging them at 2am — not from a textbook.
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
            <GitHubIcon />
            Ryan19941212/F1tenth
            <span className="text-ink-400">→</span>
          </a>
        </motion.div>

        {/* Demo videos — visual hook moved up */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="tech-label">LIVE DEMO FEED</span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-[12px] text-ink-400">03 / CAPTURES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {demos.map((demo, i) => (
              <motion.div
                key={demo.id}
                className="group relative bg-ink-900 border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute -top-3 left-4 z-10 px-2 bg-ink-950">
                  <span className="tech-label-sm text-nv-500">● CH_{String(i + 1).padStart(2, '0')}</span>
                </div>

                <div className="relative aspect-video overflow-hidden">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${demo.id}`}
                    title={demo.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full relative z-0"
                    style={{ border: 0 }}
                  />
                  <div className="scanlines absolute inset-0 pointer-events-none z-10" />
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

        {/* TL;DR strip */}
        <motion.div
          className="mb-12 lg:mb-16 border border-white/10 bg-ink-900/60 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-3 left-4 px-2 bg-ink-950">
            <span className="tech-label-sm text-nv-500">● TL;DR / 30 SEC</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5">
            <div className="bg-ink-900 p-5">
              <div className="tech-label-sm mb-2">WHAT</div>
              <div className="text-white text-base leading-relaxed">
                A 1/10-scale autonomous race car I built end-to-end — firmware
                up to motion planning.
              </div>
            </div>
            <div className="bg-ink-900 p-5">
              <div className="tech-label-sm mb-2">WHY IT MATTERS</div>
              <div className="text-white text-base leading-relaxed">
                Proves I can do the robotics work I'm asking to manage. Hiring
                managers don't guess.
              </div>
            </div>
            <div className="bg-ink-900 p-5">
              <div className="tech-label-sm mb-2">STACK</div>
              <div className="text-white text-base leading-relaxed">
                ROS 2 · NVIDIA Jetson · C++/Python · LiDAR perception · MPC control.
              </div>
            </div>
            <div className="bg-ink-900 p-5">
              <div className="tech-label-sm mb-2">SCOPE</div>
              <div className="text-white text-base leading-relaxed">
                6 algorithms · ~5k LOC · solo build · real hardware + sim · 2025–2026.
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
              <span className="tech-label-sm text-nv-500">● REAL HARDWARE</span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="scanlines absolute inset-0 z-10 opacity-40 pointer-events-none" />
              <img
                src="/f1tenth-hero.jpg"
                srcSet="/f1tenth-hero-sm.jpg 800w, /f1tenth-hero.jpg 1600w"
                sizes="(max-width: 1024px) 100vw, 60vw"
                alt="RoboRacer (formerly F1TENTH) 1/10-scale autonomous race car"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1600}
                height={1200}
              />
              <div className="absolute top-4 left-4 font-mono text-[12px] text-nv-500 tracking-[0.18em] z-20 pointer-events-none">
                ● LIVE
              </div>
              <div className="absolute top-4 right-4 font-mono text-[12px] text-white/80 tracking-[0.18em] z-20 pointer-events-none">
                CAM_01
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-[12px] text-white/80 tracking-[0.18em] z-20 pointer-events-none">
                ROBORACER / LAB_CAR
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="tech-label">SYSTEM PARAMS</span>
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

        {/* System architecture — moved up, near hero */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="tech-label">SYSTEM ARCHITECTURE</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="bg-ink-900 border border-white/5 p-6 sm:p-8">
            <ArchitectureDiagram />
          </div>

          <p className="mt-4 font-mono text-[13px] text-ink-400">
            // Priority-based Ackermann mux ensures AEB (priority 200) overrides
            any autonomous algorithm (priority 10) in case of imminent collision.
          </p>
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
            <span className="tech-label">ALGORITHM STACK</span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-[12px] text-ink-400">06 / MODULES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {algorithms.slice(0, 5).map((algo, i) => (
              <AlgoCard key={algo.id} algo={algo} index={i} />
            ))}
            {/* MPC - featured (full width) */}
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
                  <p className="text-ink-300 text-base mb-4 font-mono">
                    {algorithms[5].summary}
                  </p>
                  <p className="text-lg text-ink-100 leading-relaxed max-w-2xl">
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

        {/* Single code snippet — MPC (capstone) */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="tech-label">CODE SAMPLE · MPC CORE</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="max-w-4xl">
            <CodeBlock filename="mpc/controller.py" code={mpcSnippet} />
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
            <span className="tech-label">ENGINEERING DECISIONS</span>
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-[12px] text-ink-400">TRADE-OFFS</span>
          </div>
          <p className="text-lg text-ink-200 leading-relaxed max-w-3xl mb-8">
            The fun part of robotics is not writing the algorithm — it's deciding
            which one, tuned how, at what latency cost. Three calls I had to make:
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
                <div className="font-mono text-[12px] text-ink-400 mb-3 tracking-[0.18em]">
                  DECISION_{d.n}
                </div>
                <h4 className="font-display font-semibold text-white text-lg mb-3">
                  {d.title}
                </h4>
                <p className="text-ink-200 text-base leading-relaxed">{d.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Field note — collapsed to a single-column aside */}
        <motion.aside
          className="relative border-l-2 border-nv-500/40 pl-5 sm:pl-6 py-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="tech-label-sm text-nv-500 mb-2">● FIELD NOTE / SIM TO REAL</div>
          <h3 className="font-display font-semibold text-white text-xl sm:text-2xl mb-3">
            The servo died. I rebuilt the firmware.
          </h3>
          <p className="text-base text-ink-200 leading-relaxed max-w-3xl">
            Mid-Lab 5 the steering servo quit on the real car: VESC 6.06 for
            60_MK6 shipped a broken servo output path, and the prebuilt binaries
            only covered MKIII/MKV/PLUS/FLIPSKY. I kept developing in AutoDRIVE
            sim while cross-compiling VESC from source off the{' '}
            <span className="font-mono text-nv-500">release_6_06</span> branch
            for MK6 via Docker → flashed → servo alive.{' '}
            <span className="text-white">
              Robotics is half writing controllers, half knowing when to drop a
              level of the stack.
            </span>
          </p>
        </motion.aside>
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
    <p className="text-ink-300 text-sm mb-3 font-mono">{algo.summary}</p>
    <p className="text-ink-200 text-base leading-relaxed mb-4">{algo.details}</p>

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
      <pre className="p-4 sm:p-5 font-mono text-[13px] sm:text-[14px] leading-relaxed text-ink-100">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

const GitHubIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ArchitectureDiagram: React.FC = () => (
  <div className="w-full overflow-x-auto">
    <svg
      viewBox="0 0 880 360"
      className="w-full min-w-[640px] max-w-[880px] mx-auto"
      role="img"
      aria-label="RoboRacer system architecture: sensors feed the safety node and planners; all outputs go through a priority-based Ackermann mux before VESC actuation."
    >
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#76b900" />
        </marker>
        <marker id="arrMuted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#565d73" />
        </marker>
      </defs>

      {/* Sensor column */}
      <g fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="13">
        <rect x="20"  y="30"  width="140" height="40" fill="#14171f" stroke="#2f3446" />
        <text x="90"  y="55"  textAnchor="middle" fill="#c8ccd9">/scan · LiDAR</text>

        <rect x="20"  y="150" width="140" height="40" fill="#14171f" stroke="#2f3446" />
        <text x="90"  y="175" textAnchor="middle" fill="#c8ccd9">/odom · Odometry</text>

        <rect x="20"  y="270" width="140" height="40" fill="#14171f" stroke="#2f3446" />
        <text x="90"  y="295" textAnchor="middle" fill="#c8ccd9">/joy · Joystick</text>

        {/* Safety node */}
        <rect x="240" y="20"  width="220" height="80" fill="#14171f" stroke="#76b900" />
        <text x="350" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600">SAFETY NODE (AEB)</text>
        <text x="350" y="68" textAnchor="middle" fill="#858ca1" fontSize="12">iTTC &lt; threshold → brake</text>
        <text x="350" y="88" textAnchor="middle" fill="#76b900" fontSize="12">prio 200 · redundant path</text>

        {/* Planners */}
        <rect x="240" y="140" width="220" height="160" fill="#14171f" stroke="#2f3446" />
        <text x="350" y="160" textAnchor="middle" fill="#ffffff" fontWeight="600">PLANNERS</text>
        <text x="260" y="185" fill="#c8ccd9">• wall_follow</text>
        <text x="260" y="205" fill="#c8ccd9">• gap_follow</text>
        <text x="260" y="225" fill="#c8ccd9">• pure_pursuit</text>
        <text x="260" y="245" fill="#c8ccd9">• rrt_star</text>
        <text x="260" y="265" fill="#c8ccd9">• mpc</text>
        <text x="350" y="288" textAnchor="middle" fill="#858ca1" fontSize="12">prio 10</text>

        {/* Mux */}
        <rect x="540" y="110" width="180" height="80" fill="#14171f" stroke="#76b900" />
        <text x="630" y="138" textAnchor="middle" fill="#ffffff" fontWeight="600">Ackermann Mux</text>
        <text x="630" y="160" textAnchor="middle" fill="#858ca1" fontSize="12">200 &gt; 100 &gt; 10</text>
        <text x="630" y="180" textAnchor="middle" fill="#76b900" fontSize="12">safety pre-empts autonomy</text>

        {/* VESC */}
        <rect x="770" y="110" width="90" height="80" fill="#14171f" stroke="#76b900" />
        <text x="815" y="145" textAnchor="middle" fill="#ffffff" fontWeight="600">VESC</text>
        <text x="815" y="168" textAnchor="middle" fill="#858ca1" fontSize="11">steer + throttle</text>
      </g>

      {/* Arrows */}
      <g fill="none" strokeWidth="1.5">
        {/* LiDAR → Safety + Planners */}
        <path d="M160 50 L240 60" stroke="#76b900" markerEnd="url(#arr)" />
        <path d="M160 60 Q 200 120 240 180" stroke="#565d73" markerEnd="url(#arrMuted)" />
        {/* Odom → Safety + Planners */}
        <path d="M160 170 Q 200 130 240 85"  stroke="#565d73" markerEnd="url(#arrMuted)" />
        <path d="M160 180 L240 210" stroke="#565d73" markerEnd="url(#arrMuted)" />
        {/* Joy → Mux */}
        <path d="M160 290 Q 400 280 540 170" stroke="#565d73" markerEnd="url(#arrMuted)" />
        {/* Safety → Mux (prio 200) */}
        <path d="M460 60 Q 500 90 540 130" stroke="#76b900" markerEnd="url(#arr)" />
        {/* Safety → VESC direct redundant */}
        <path d="M460 80 Q 620 50 815 110" stroke="#76b900" strokeDasharray="4 3" markerEnd="url(#arr)" />
        {/* Planners → Mux */}
        <path d="M460 220 Q 500 200 540 170" stroke="#565d73" markerEnd="url(#arrMuted)" />
        {/* Mux → VESC */}
        <path d="M720 150 L770 150" stroke="#76b900" markerEnd="url(#arr)" />
      </g>
    </svg>
  </div>
);

export default RoboRacerShowcase;
