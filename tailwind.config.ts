import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          glow: "#00E5FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "cyan-glow": "0 0 40px -10px rgba(0,229,255,0.5)",
        "cyan-dot": "0 0 12px #00E5FF",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 8px #00E5FF, 0 0 16px #00E5FF" },
          "50%": { boxShadow: "0 0 16px #00E5FF, 0 0 32px #00E5FF" },
        },
      },
      animation: {
        blink: "blink 1.4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
