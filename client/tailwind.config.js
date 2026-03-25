/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        warm: "#fbfaf7",
        sage: "#8fb996",
        "sage-dark": "#6ea37b",
        ink: "#1f2937",
        muted: "#6b7280",
      },
      boxShadow: {
        calm: "0 1px 0 rgba(0,0,0,0.04)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.2, 0.9, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
