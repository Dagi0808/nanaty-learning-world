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
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-8deg) scale(1.1)' },
          '50%': { transform: 'rotate(8deg) scale(1.1)' },
        },
        popIn: {
          '0%': { transform: 'scale(0) rotate(-5deg)', opacity: '0' },
          '60%': { transform: 'scale(1.15) rotate(3deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        starFly: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(2)', opacity: '0' },
        },
        bounce_custom: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        pulse_glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(167,139,250,0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(167,139,250,0.9), 0 0 60px rgba(236,72,153,0.4)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        rainbow: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.3)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out',
        popIn: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        float: 'float 3s ease-in-out infinite',
        starFly: 'starFly 0.9s ease-out forwards',
        bounce_custom: 'bounce_custom 0.8s ease-in-out infinite',
        pulse_glow: 'pulse_glow 2s ease-in-out infinite',
        shake: 'shake 0.5s ease-in-out',
        rainbow: 'rainbow 3s linear infinite',
        sparkle: 'sparkle 1.5s ease-in-out infinite',
      },
      boxShadow: {
        'kid': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        'kid-lg': '0 16px 48px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)',
        'colored': '0 8px 32px rgba(167,139,250,0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config
