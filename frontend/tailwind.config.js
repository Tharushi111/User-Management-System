import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',  // <-- Enable class-based dark mode toggle
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  
  // Optional DaisyUI config (customize themes if you want)
  daisyui: {
    themes: ["light", "dark"], // Default light and dark themes
  },
}
