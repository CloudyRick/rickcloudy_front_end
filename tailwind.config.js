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
        hero: "url('/images/web_dev.png')",
      },
      colors: {
        lavender: "#E4E6F1",
        "dark-gray": "391400",
        terra: "#EF6C57",
      },
    },
  },
  plugins: [],
};
