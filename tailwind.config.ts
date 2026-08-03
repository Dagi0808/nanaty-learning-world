import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka One', 'cursive'],
        nunito: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      scale: {
        '103': '1.03',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg) scale(1.08)' },
          '50%': { transform: 'rotate(6deg) scale(1.08)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.3) rotate(-8deg)', opacity: '0' },
          '60%': { transform: 'scale(1.1) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        starFly: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-80px) scale(1.8)', opacity: '0' },
        },
        bounce_custom: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-14px) scale(1.04)' },
        },
        pulse_glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(167,139,250,0.5)' },
          '50%': { boxShadow: '0 0 28px rgba(167,139,250,0.85), 0 0 50px rgba(236,72,153,0.35)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-5px)' },
          '40%': { transform: 'translateX(5px)' },
          '60%': { transform: 'translateX(-3px)' },
          '80%': { transform: 'translateX(3px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.25)' },
        },
      },
      animation: {
        // Medium speed — not too fast, not too slow
        wiggle:        'wiggle 0.7s ease-in-out',
        popIn:         'popIn 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        float:         'float 4s ease-in-out infinite',
        starFly:       'starFly 1s ease-out forwards',
        bounce_custom: 'bounce_custom 1s ease-in-out infinite',
        pulse_glow:    'pulse_glow 2.5s ease-in-out infinite',
        shake:         'shake 0.6s ease-in-out',
        sparkle:       'sparkle 2s ease-in-out infinite',
      },
      boxShadow: {
        'kid':    '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        'kid-lg': '0 16px 48px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)',
        'colored':'0 8px 32px rgba(167,139,250,0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config
