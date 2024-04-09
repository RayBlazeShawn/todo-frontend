const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html", // If you have an index.html file that uses Tailwind classes
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      // Example of extending Tailwind's default color palette
      colors: {
        'brand-blue': '#007ace',
        'brand-red': '#ff4136',
        // Utilizing colors from Tailwind's color palette
        teal: colors.teal,
        cyan: colors.cyan,
      },
      // Example of extending the font family
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['Merriweather', 'serif'],
      },
      // Example of custom spacing
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
  // If using any form of Tailwind CSS forms, typography, or other official plugins, add them here.
}
