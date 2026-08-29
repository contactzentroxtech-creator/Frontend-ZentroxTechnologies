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
          dark: "var(--z-dark)",
          dark2: "var(--z-dark2)",
          dark3: "var(--z-dark3)",
          dark4: "var(--z-dark4)",

          accent: "var(--z-accent)",
          accent2: "var(--z-accent2)",
          accent3: "var(--z-accent3)",
          gold: "var(--z-gold)",

          text: "var(--z-text)",
          muted: "var(--z-muted)",

          border: "var(--z-border)",
          glow: "var(--z-glow)",
        },
      },

      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "monospace"],
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
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
          "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",

        "hero-glow":
          "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(37,99,235,0.10) 0%, transparent 72%)",

        "card-glow":
          "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(37,99,235,0.06) 0%, transparent 60%)",

        "accent-gradient":
          "linear-gradient(135deg, var(--z-accent) 0%, var(--z-accent2) 50%, var(--z-accent3) 100%)",
      },

      backdropBlur: {
        xs: "2px",
      },

      boxShadow: {
        "glow-accent":
          "0 10px 35px rgba(37,99,235,0.12)",

        "glow-sm":
          "0 6px 20px rgba(37,99,235,0.10)",

        card:
          "0 8px 30px rgba(15,23,42,0.08)",

        "card-hover":
          "0 20px 50px rgba(15,23,42,0.14)",
      },
    },
  },

  plugins: [],
};
