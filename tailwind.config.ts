import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: '#eef0ff',
          100: '#dfe3ff',
          200: '#c2c9ff',
          500: '#6366f1',
          600: '#5551e0',
          700: '#4540bf',
        },
        violet: {
          50: '#f6eeff',
          100: '#ecddff',
          200: '#d8b9ff',
          500: '#a855f7',
          600: '#8e3ae0',
          700: '#7428c0',
        },
        ink: {
          DEFAULT: '#1d2327',
          2: '#2c3338',
          3: '#3c434a',
          4: '#50575e',
          5: '#646970',
          6: '#8c8f94',
        },
        rule: {
          DEFAULT: '#e5e5e7',
          2: '#eeeef0',
        },
        canvas: '#f8f8fa',
        surface: '#ffffff',
        ok: '#008a20',
        warn: '#b26200',
        bad: '#b32d2e',
      },
      fontFamily: {
        sans: ['var(--font-inter-tight)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        eyebrow: ['12px', { lineHeight: '1.2', letterSpacing: '0.14em' }],
        display: ['64px', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        h1: ['44px', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        h2: ['32px', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        h3: ['22px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        section: '1240px',
        text: '1000px',
        prose: '680px',
      },
      borderRadius: {
        card: '8px',
        btn: '6px',
        hero: '12px',
      },
      backgroundImage: {
        'ajx-gradient': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        'ajx-gradient-soft': 'linear-gradient(135deg, #eef0ff 0%, #f6eeff 100%)',
      },
      boxShadow: {
        'card-hover': '0 8px 28px -12px rgba(17,19,24,.18)',
        'btn-primary': '0 1px 0 rgba(255,255,255,.15) inset, 0 4px 14px -4px rgba(99,102,241,.5)',
        'btn-primary-hover':
          '0 1px 0 rgba(255,255,255,.15) inset, 0 8px 22px -6px rgba(99,102,241,.6)',
        attribution:
          '0 20px 60px -24px rgba(17,19,24,.18), 0 2px 4px rgba(17,19,24,.04)',
      },
      keyframes: {
        pulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(168,85,247,.55)' },
          '70%': { boxShadow: '0 0 0 10px rgba(168,85,247,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(168,85,247,0)' },
        },
      },
      animation: {
        pulse: 'pulse 1.8s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
