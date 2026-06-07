/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  safelist: [
    // Sidebar transform classes — must not be purged
    'translate-x-0',
    '-translate-x-full',
    'lg:translate-x-0',
    'lg:pl-60',
    'hidden',
    'lg:hidden',
    'lg:block',
    'lg:flex',
    'hidden',
    'sm:block',
    'sm:flex',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        secondary: {
          400: '#67e8f9',
          500: '#22d3ee',
          600: '#06b6d4',
        },
        accent: {
          400: '#a5b4fc',
          500: '#6366f1',
          600: '#4f46e5',
        },
        dark: {
          bg:      '#0b0f14',
          surface: '#111827',
          card:    '#1a2234',
          border:  '#1e2d45',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '60': '15rem', // 240px — sidebar width
      },
      screens: {
        'xs': '375px',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':     'shimmer 2s linear infinite',
        'spin-slow':   'spin-slow 1s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
