// // tailwind.config.js
// export const content = [
//   "./src/**/*.{js,jsx,ts,tsx}", // For React components
//   "./public/index.html", // For HTML files
// ];
// export const theme = {
//   extend: {},
// };
// export const plugins = [];

// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // For React components
    "./public/index.html", // For HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
