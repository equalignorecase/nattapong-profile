import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Anuphan"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Anuphan"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        tokyo: {
          bg: 'rgb(var(--tokyo-bg) / <alpha-value>)',
          header: 'rgb(var(--tokyo-header) / <alpha-value>)',
          window: 'rgb(var(--tokyo-window) / <alpha-value>)',
          card: 'rgb(var(--tokyo-card) / <alpha-value>)',
          cardHover: 'rgb(var(--tokyo-card-hover) / <alpha-value>)',
          border: 'rgb(var(--tokyo-border) / <alpha-value>)',
          heading: 'rgb(var(--tokyo-heading) / <alpha-value>)',
          text: 'rgb(var(--tokyo-text) / <alpha-value>)',
          comment: 'rgb(var(--tokyo-comment) / <alpha-value>)',
          blue: 'rgb(var(--tokyo-blue) / <alpha-value>)',
          cyan: 'rgb(var(--tokyo-cyan) / <alpha-value>)',
          mint: 'rgb(var(--tokyo-mint) / <alpha-value>)',
          green: 'rgb(var(--tokyo-green) / <alpha-value>)',
          purple: 'rgb(var(--tokyo-purple) / <alpha-value>)',
          amber: 'rgb(var(--tokyo-amber) / <alpha-value>)',
          red: 'rgb(var(--tokyo-red) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [typography],
};
