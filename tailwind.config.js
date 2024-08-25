/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./App.tsx"],
  theme: {
    extend: {
      fontFamily: {
        "roboto-bold": ["Roboto"],
        poppins: ["Poppins"],
        typewriter: ["Cutive"],
        epilogue: ["Epilogue"],
        mulish: ["Mulish"],
      },
      backgroundImage: {
        // "doodle-pattern": "url('/images/doodles.png')",
      },
      colors: {
        lavender: "#E4E6F1",
        "dark-gray": "391400",
        terra: "#EF6C57",
        "pastel-blue": "#E8ECF4",
        "muted-navy": "#222831",
        "dark-slate": "#393E46",
      },
    },
  },
  plugins: [],
};
