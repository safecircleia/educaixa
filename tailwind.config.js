/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'void-black': '#0a0a0f',
        'neon-blue': '#4dc8ff',
        'hacker-green': '#10b981',
        slate: {
          900: '#0f172a',
        },
        accent: {
          teal: '#2dd4bf',
          indigo: '#6366f1',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        nothing: ['var(--font-nothing)'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-spin': 'radar 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-flow': 'gradient 2s linear infinite',
        'float-smooth': 'float 6s cubic-bezier(0.37, 0, 0.63, 1) infinite',
        shine: 'shine 5s linear infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(0.8)', opacity: 0.8 },
          '50%': { transform: 'scale(1)', opacity: 1 },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      scale: {
        '25': '.25',
        '50': '.5',
        '75': '.75',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
};
