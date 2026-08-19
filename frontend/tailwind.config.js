/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706', // Primary Amber
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        dark: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#0B0F17', // Deep Charcoal Canvas
        },
        accent: {
          orange: '#F97316',
          amber: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E',
        },
        taxi: {
          yellow: '#FFD700',
          red: '#DC2626',
          darkred: '#991B1B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(217, 119, 6, 0.35)',
        'glow-lg': '0 0 30px -5px rgba(217, 119, 6, 0.45)',
        'glow-red': '0 0 20px -3px rgba(220, 38, 38, 0.4)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
