/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium dark theme
        dark: {
          900: '#000000',
          800: '#0a0a0a',
          700: '#0f0f0f',
          600: '#121212',
          500: '#1a1a1a',
          400: '#1f1f1f',
          300: '#262626',
          200: '#2a2a2a',
        },
        // Primary gradient colors
        primary: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          dark: '#7c3aed',
        },
        // Accent colors
        accent: {
          purple: '#8b5cf6',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          gold: '#f59e0b',
          pink: '#ec4899',
        },
        // Text colors
        text: {
          primary: '#ffffff',
          secondary: '#a1a1aa',
          muted: '#71717a',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
        'gradient-glow': 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(139, 92, 246, 0.3)',
        'glow': '0 0 30px rgba(139, 92, 246, 0.4)',
        'glow-lg': '0 0 60px rgba(139, 92, 246, 0.5)',
        'glow-gold': '0 0 30px rgba(245, 158, 11, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  plugins: []
}
