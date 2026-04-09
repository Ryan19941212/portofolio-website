/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['"Space Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // NVIDIA green - primary accent (signals the target)
        nv: {
          50:  '#f2fde3',
          100: '#e2fac0',
          200: '#c9f58a',
          300: '#a6e84c',
          400: '#8cd626',
          500: '#76b900',  // NVIDIA brand green
          600: '#5c9500',
          700: '#457100',
          800: '#325200',
          900: '#1f3300',
        },
        // Amber - "live/warning" telemetry signals
        amber: {
          500: '#ffb020',
        },
        // Neutral grays - blueprint/HUD backdrop
        ink: {
          950: '#05060a',
          900: '#0a0c12',
          800: '#11141c',
          700: '#1a1e29',
          600: '#242938',
          500: '#3a4056',
          400: '#5d6479',
          300: '#8a91a4',
          200: '#b4b9c8',
          100: '#dcdfe8',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'scan': 'scan 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%':      { transform: 'translateY(100%)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        flicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%':           { opacity: '0.5' },
          '97%':           { opacity: '1' },
          '98%':           { opacity: '0.3' },
        },
      },
      backgroundImage: {
        'grid': 'linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px)',
        'dots': 'radial-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm': '24px 24px',
        'grid-md': '48px 48px',
        'dots-md': '20px 20px',
      },
    },
  },
  plugins: [],
}
