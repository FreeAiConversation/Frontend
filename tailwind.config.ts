import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#000000',
          card: '#0A0A0A',
          elevated: '#111111',
          input: '#0D0D0D',
          hover: '#161616',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0A0',
          muted: '#666666',
          dim: '#3A3A3A',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.16)',
        },
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(255,255,255,0.06)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
        'glow': '0 0 40px rgba(255,255,255,0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease both',
        'fade-in-up': 'fadeInUp 0.7s ease both',
        'pulse-slow': 'pulse 1s ease-in-out infinite',
        'border-rotate': 'border-rotate 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'border-rotate': {
          'to': { '--border-angle': '360deg' },
        },
      },
      maxWidth: {
        'container': '1140px',
      },
    },
  },
  plugins: [],
};
export default config;
