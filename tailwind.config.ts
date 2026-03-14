import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "brand-green": {
          DEFAULT: "#2d6a4f",
          dark: "#1e4d38",
          light: "#e8f5ee",
        },
        "brand-amber": "#e8952a",
        "brand-dark": "#1a1a1f",
        "brand-grey": "#f4f3f0",
        "brand-border": "#e2e0db",
      },
      fontFamily: {
        display: ["var(--font-barlow-condensed)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        hover: "var(--shadow-hover)",
        modal: "var(--shadow-modal)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        btn: "var(--radius-btn)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "slide-in": "slideInRight 0.25s ease-out forwards",
        "slide-up": "slideUp 0.3s ease-out forwards",
        "bounce-in": "bounceIn 0.5s ease-out forwards",
        "pulse-once": "pulseOnce 0.6s ease-out",
        "pulse-ring": "pulseRing 3s ease-out infinite",
        "toast-in": "toastIn 0.3s ease-out forwards",
        "toast-out": "toastOut 0.2s ease-in forwards",
        "chip-in": "chipIn 0.3s ease-out forwards",
        "count-up": "countUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseOnce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(45, 106, 79, 0.5)" },
          "70%": { boxShadow: "0 0 0 8px rgba(45, 106, 79, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(45, 106, 79, 0)" },
        },
        toastIn: {
          from: { opacity: "0", transform: "translateX(100%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        toastOut: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(100%)" },
        },
        chipIn: {
          from: { opacity: "0", transform: "scale(0.8) translateY(4px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        countUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
