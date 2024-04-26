/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#6096B4',
        }
      }
    },
  },
  plugins: [],
};

module.exports = config;