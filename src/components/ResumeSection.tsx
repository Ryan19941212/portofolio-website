import React from 'react';
import { motion } from 'framer-motion';

interface ResumeSectionProps {
  baseUrl: string;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ baseUrl }) => {
  const features = [
    { icon: '💼', text: 'Professional Experience' },
    { icon: '🎓', text: 'Education & Certifications' },
    { icon: '🛠️', text: 'Technical Skills' },
    { icon: '🏆', text: 'Key Achievements' }
  ];

  return (
    <section id="resume" className="py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Enhanced Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent px-2 sm:px-4 mb-4 sm:mb-6">
              My Resume
            </h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              See how I combine <span className="text-blue-400 font-semibold">technical expertise</span> and
              <span className="text-purple-400 font-semibold"> leadership experience</span> to deliver
              <span className="text-pink-400 font-semibold"> product impact</span>.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-2xl sm:text-3xl mb-2">{feature.icon}</div>
                  <div className="text-xs sm:text-sm text-gray-300 font-medium">{feature.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.a
              href={`${baseUrl}resume.pdf`}
              download="Ryan_Huang_Resume.pdf"
              className="group relative inline-flex items-center justify-center px-10 sm:px-14 py-4 sm:py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg sm:text-xl overflow-hidden shadow-2xl shadow-blue-500/30"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated gradient background layer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Pulsing glow effect */}
              <motion.div
                className="absolute -inset-[4px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0"
                whileHover={{
                  opacity: [0.5, 0.8, 0.5],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />

              {/* Solid border glow on hover */}
              <motion.div
                className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </div>

              {/* Icon with bounce animation */}
              <motion.svg
                className="w-6 sm:w-7 h-6 sm:h-7 mr-3 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{
                  y: [0, -5, 0],
                  transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </motion.svg>
              <span className="relative z-10">Download Resume (PDF)</span>
            </motion.a>

            {/* File size info */}
            <motion.p
              className="mt-4 text-xs text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              PDF • Updated Nov 2024 • 1 page
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
