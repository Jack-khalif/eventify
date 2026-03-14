/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14B8A6",      // Turquoise
        secondary: "#0F172A",    // Deep navy
        accent: "#FF6B6B",       // Coral
        light: "#F8FAFC",        // Off-white
      },
    },
  },
  plugins: [],
}