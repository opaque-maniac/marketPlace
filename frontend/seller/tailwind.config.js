/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,ts,jsx,js}"],
  theme: {
    extend: {
      maxWidth: {
        1300: "1300px",
        800: "800px",
      },
      width: {},
      minWidth: {
        600: "600px",
      },
    },
  },
  plugins: [],
};
