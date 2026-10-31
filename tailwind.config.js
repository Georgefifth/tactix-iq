/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#080C0E',
        surface: '#0F171B',
        panel: '#152228',
        tactical: '#1E313B',
        turf: '#0B1E19',
        lines: '#1D4537',
        emerald: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          900: '#064E3B',
        },
        crimson: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [],
}
