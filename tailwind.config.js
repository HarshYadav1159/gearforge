/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',     // App directory
    './pages/**/*.{js,ts,jsx,tsx}',   // (if you're using pages dir too)
    './components/**/*.{js,ts,jsx,tsx}', // Reusable components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

