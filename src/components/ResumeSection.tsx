import React from 'react';
import { motion } from 'framer-motion';

interface ResumeSectionProps {
  baseUrl: string;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ baseUrl }) => {
  return (
    <section id="resume" className="py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />

      <div className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent px-2 sm:px-4 mb-4 sm:mb-6">
              Resume
            </h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              See how I combine technical expertise and leadership experience to deliver product impact.
            </motion.p>
          </motion.div>

          {/* Download Button with Glowing Gradient Hover Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.a
              href={`${baseUrl}/resume.pdf`}
              download
              className="group relative inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated gradient background layer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Pulsing glow effect - blue to pink gradient */}
              <motion.div
                className="absolute -inset-[4px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0"
                animate={{
                  opacity: [0, 0, 0, 0],
                }}
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

              {/* Icon with bounce animation */}
              <motion.svg
                className="w-7 h-7 mr-3 relative z-10"
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
              <span className="relative z-10">Download Resume</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
