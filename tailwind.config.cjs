const springPlugin = require("@ringcentral/spring-theme/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./popup.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@ringcentral/spring-ui/**/*.js",
  ],
  plugins: [springPlugin()],
};
