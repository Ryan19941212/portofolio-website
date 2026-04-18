import React from 'react';
import { motion } from 'framer-motion';

const contactMethods = [
  {
    label: 'EMAIL',
    value: 'ryan.huang.2027@anderson.ucla.edu',
    href: 'mailto:ryan.huang.2027@anderson.ucla.edu',
    hint: 'Best for detailed inquiries',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="square" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/ching-yu-huang',
    href: 'https://www.linkedin.com/in/ching-yu-huang/',
    target: '_blank',
    hint: 'Connect professionally',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'PHONE',
    value: '+1 (424) 467-6369',
    href: 'tel:+14244676369',
    hint: 'Quick conversations',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="square" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

const ContactForm: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative bg-ink-950 py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint-fine opacity-50" />
      <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-nv-500/5 rounded-full blur-[120px]" />

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
            <span className="tech-label text-ink-300">CONTACT / 06</span>
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4">
            Open a channel.
          </h2>
          <p className="text-lg md:text-xl text-ink-200 max-w-2xl leading-relaxed">
            Building something in robotics, autonomy, or AI product? I want to
            hear about it. Usually respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {contactMethods.map((m, i) => (
            <motion.a
              key={m.label}
              href={m.href}
              target={m.target}
              rel={m.target ? 'noopener noreferrer' : undefined}
              className="group relative bg-ink-900 p-8 hover:bg-ink-800 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="absolute top-0 left-0 h-px bg-nv-500 w-0 group-hover:w-full transition-all duration-700" />

              <div className="flex items-center justify-between mb-6">
                <div className="text-ink-200 group-hover:text-nv-500 transition-colors">
                  {m.icon}
                </div>
                <span className="tech-label-sm text-ink-400">{m.label}</span>
              </div>

              <div className="text-white text-base md:text-lg font-medium break-all mb-2 group-hover:text-nv-500 transition-colors">
                {m.value}
              </div>
              <div className="font-mono text-[13px] text-ink-400">
                // {m.hint}
              </div>

              <div className="mt-6 flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.18em] text-ink-400 group-hover:text-nv-500 transition-colors">
                <span>&gt; Reach out</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
