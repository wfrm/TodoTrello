/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBackgroundColor: '#0d1117',
        columnBackgroundColor: '#161c22',
        customWhite: '#fafafa'
      }
    },
  },
  plugins: [],
}

