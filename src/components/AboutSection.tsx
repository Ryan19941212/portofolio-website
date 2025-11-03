import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  const highlights = [
    { icon: '🏗️', label: 'Civil Engineering', value: '5+ years' },
    { icon: '🎓', label: 'UCLA Anderson', value: 'MBA 2027' },
    { icon: '🤖', label: 'AI Products', value: 'Building Now' }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Enhanced Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 sm:mb-8">
            About Me
          </h2>

          {/* Main Content Card */}
          <motion.div
            className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 md:p-12 shadow-2xl overflow-hidden group mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Animated gradient border on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl" />

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I started my career building <span className="text-white font-semibold">large-scale infrastructure</span>—from underground railways to LNG terminals.
              <br /><br />
              Now, as a <span className="text-purple-400 font-semibold">UCLA Anderson MBA</span>, I'm building <span className="text-blue-400 font-semibold">digital infrastructure</span>—AI-driven tools that make construction and design smarter and safer.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 mb-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.5
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                  <div className="text-sm font-bold text-white">{item.value}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="#resume"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold text-base sm:text-lg relative z-10 overflow-hidden group/button shadow-lg shadow-purple-500/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </div>

              <span className="relative z-10">View My Journey</span>
              <svg className="ml-2 w-5 h-5 group-hover/button:translate-y-1 transition-transform duration-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
