/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      colors: {
        "weather-violet": "#302D5A",
        "weather-yellow": "#FBFFF1",
      },
      fontFamily: {
        maven: ["Maven Pro"],
      },
    },
  },
  plugins: [],
};
