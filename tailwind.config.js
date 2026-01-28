/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
  // Performance optimizations
  corePlugins: {
    // Disable unused features for smaller CSS
    float: false,
    clear: false,
    skew: false,
    caretColor: false,
    sepia: false,
  },
  // Purge unused CSS more aggressively
  safelist: [
    // Keep essential classes
    'animate-pulse',
    'animate-spin',
    'transition-colors',
    'transition-shadow',
    'hover:scale-110',
    'group-hover:scale-110',
  ],
} 