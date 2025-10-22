import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="min-h-screen py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-900/5 to-black" />

      <div className="relative z-10 w-full">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4 md:space-y-6 mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4 font-medium">
            Let's collaborate to build the next AI-powered product.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Glass morphism form container */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-white/10 relative overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Subtle gradient glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Contact Information Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 relative z-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Email */}
              <motion.a
                href="mailto:ryan.huang.2027@anderson.ucla.edu"
                className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all duration-300 group/card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-sm mb-1">Email</h3>
                    <p className="text-gray-400 text-xs break-all">ryan.huang.2027@anderson.ucla.edu</p>
                  </div>
                </div>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/ching-yu-huang/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all duration-300 group/card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </motion.div>
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-sm mb-1">LinkedIn</h3>
                    <p className="text-gray-400 text-xs">Ching-Yu Huang</p>
                  </div>
                </div>
              </motion.a>

              {/* Mobile */}
              <motion.a
                href="tel:+14244676369"
                className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all duration-300 group/card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </motion.div>
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-sm mb-1">Mobile</h3>
                    <p className="text-gray-400 text-xs">424-467-6369</p>
                  </div>
                </div>
              </motion.a>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="border-t border-white/10 mb-8 relative z-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />

            {/* Form Content */}
            <div className="relative z-10" id="contact-form-container">
              <motion.h3
                className="text-3xl font-bold text-white mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Send me a message
              </motion.h3>

              {/* Netlify Form */}
              <motion.form
                id="contact-form"
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Hidden fields for Netlify */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                {/* Name */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-3">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-5 py-4 bg-white/5 backdrop-blur-md border-2 border-white/10 text-white rounded-xl transition-all duration-300 hover:border-white/20 placeholder-gray-500 focus:outline-none"
                      placeholder="Your name"
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        borderImage: focusedField === 'name' ? 'linear-gradient(90deg, #3b82f6, #a855f7, #ec4899) 1' : 'none',
                        boxShadow: focusedField === 'name' ? '0 0 20px rgba(59, 130, 246, 0.3)' : 'none'
                      }}
                    />
                    {focusedField === 'name' && (
                      <motion.div
                        className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl -z-10 blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-5 py-4 bg-white/5 backdrop-blur-md border-2 border-white/10 text-white rounded-xl transition-all duration-300 hover:border-white/20 placeholder-gray-500 focus:outline-none"
                      placeholder="your.email@example.com"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        borderImage: focusedField === 'email' ? 'linear-gradient(90deg, #3b82f6, #a855f7, #ec4899) 1' : 'none',
                        boxShadow: focusedField === 'email' ? '0 0 20px rgba(168, 85, 247, 0.3)' : 'none'
                      }}
                    />
                    {focusedField === 'email' && (
                      <motion.div
                        className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl -z-10 blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-3">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-5 py-4 bg-white/5 backdrop-blur-md border-2 border-white/10 text-white rounded-xl transition-all duration-300 resize-none hover:border-white/20 placeholder-gray-500 focus:outline-none"
                      placeholder="Tell me about your project, idea, or opportunity…"
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        borderImage: focusedField === 'message' ? 'linear-gradient(90deg, #3b82f6, #a855f7, #ec4899) 1' : 'none',
                        boxShadow: focusedField === 'message' ? '0 0 20px rgba(236, 72, 153, 0.3)' : 'none'
                      }}
                    />
                    {focusedField === 'message' && (
                      <motion.div
                        className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl -z-10 blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div className="pt-4" variants={itemVariants}>
                  <motion.button
                    type="submit"
                    id="submit-button"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 blur-lg"
                      whileHover={{ opacity: 0.6 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Send Message</span>
                  </motion.button>
                </motion.div>
              </motion.form>
            </div>

            {/* Thank You Message (hidden by default) */}
            <motion.div
              id="thank-you-message"
              className="hidden text-center space-y-6 relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 backdrop-blur-md rounded-full mb-4 border border-green-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </motion.div>
              <h3 className="text-3xl font-bold text-white">Thank You!</h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                Your message has been sent successfully. I'll get back to you within 24 hours.
              </p>
              <button
                id="send-another"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl"
              >
                Send Another Message
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
