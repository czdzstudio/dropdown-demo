/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#38a9f6',
          500: '#0e8ce7',
          600: '#026ec5',
          700: '#0357a0',
          800: '#074a83',
          900: '#0b3f6d',
          950: '#072848',
        },
        transit: {
          blue: '#1E40AF',
          orange: '#EA580C',
          teal: '#0D9488',
        }
      },
      boxShadow: {
        'sheet': '0 -10px 40px -5px rgba(0, 0, 0, 0.15)',
        'thumb': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'slide-up': 'slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'pop': 'pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

