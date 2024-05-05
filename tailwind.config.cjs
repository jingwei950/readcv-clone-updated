/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@spartan-ng/ui-core/hlm-tailwind-preset")],
  content: [
    "./index.html",
    "./src/**/*.{html,ts,md}",
    "./src/app/shared/spartan-components/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
