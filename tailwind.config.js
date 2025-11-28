module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        slateIndigo: "#0B1120", // background
        neonCyan: "#00F0FF",
        electricBlue: "#00A8FF",
        neonPurple: "#9B5CFF",
        glassBorder: "rgba(255,255,255,0.06)"
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['"Fira Code"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        'neon-sm': '0 4px 30px rgba(0,160,255,0.06), inset 0 1px 0 rgba(255,255,255,0.02)',
      },
      backdropBlur: {
        xs: '4px'
      }
    }
  },
  plugins: [],
}
