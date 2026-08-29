/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        z: {
          /*
           * IMPORTANT:
           * CSS variables use kar rahe hain so light/dark
           * mode me puri website automatically update hogi.
           */

          dark: "rgb(var(--z-dark) / <alpha-value>)",
          dark2: "rgb(var(--z-dark2) / <alpha-value>)",
          dark3: "rgb(var(--z-dark3) / <alpha-value>)",
          dark4: "rgb(var(--z-dark4) / <alpha-value>)",

          accent: "rgb(var(--z-accent) / <alpha-value>)",
          accent2: "rgb(var(--z-accent2) / <alpha-value>)",
          accent3: "rgb(var(--z-accent3) / <alpha-value>)",

          gold: "rgb(var(--z-gold) / <alpha-value>)",

          text: "rgb(var(--z-text) / <alpha-value>)",
          muted: "rgb(var(--z-muted) / <alpha-value>)",

          border: "rgb(var(--z-border) / <alpha-value>)",
          glow: "rgb(var(--z-glow) / <alpha-value>)",
        },
      },

      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],

        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "spin-slow": "spin 8s linear infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marqueeReverse 25s linear infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },

        pulseGlow: {
          "0%, 100%": {
            opacity: "0.7",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.04)",
          },
        },

        gradientShift: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },

        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(24px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },

        bounceSoft: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        },

        marquee: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },

        marqueeReverse: {
          "0%": {
            transform: "translateX(-50%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },

      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgb(var(--z-grid) / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--z-grid) / 0.08) 1px, transparent 1px)",

        "hero-glow":
          "radial-gradient(ellipse 70% 55% at 50% 0%, rgb(var(--z-accent) / 0.12) 0%, transparent 72%)",

        "card-glow":
          "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgb(var(--z-accent) / 0.08) 0%, transparent 60%)",

        "accent-gradient":
          "linear-gradient(135deg, rgb(var(--z-accent)) 0%, rgb(var(--z-accent2)) 50%, rgb(var(--z-accent3)) 100%)",
      },

      backdropBlur: {
        xs: "2px",
      },

      boxShadow: {
        "glow-accent":
          "0 10px 35px rgb(var(--z-accent) / 0.18)",

        "glow-sm":
          "0 6px 20px rgb(var(--z-accent) / 0.12)",

        card:
          "0 8px 30px rgb(var(--z-shadow) / 0.10)",

        "card-hover":
          "0 20px 50px rgb(var(--z-shadow) / 0.16)",
      },
    },
  },

  plugins: [],
};
