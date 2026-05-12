import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  safelist: [
    "bg-gradient-to-r",
    "from-primary-500",
    "to-primary-700",
    "bg-clip-text",
    "text-transparent",
  ],
  theme: {
    extend: {
      colors: {
        // Electric purple — matches app theme primary
        primary: {
          50: "#F5EFFD",
          100: "#E8DAFB",
          200: "#D6BBF7",
          300: "#B58BF0",
          400: "#9461E9",
          500: "#7B3FE4",
          600: "#5B23B8",
          700: "#481B91",
          800: "#36156D",
          900: "#270F50",
        },
        // Lime — matches app secondary / positive
        lime: {
          50: "#F1F8E1",
          100: "#E2F1C3",
          200: "#C8E68A",
          300: "#9FCB48",
          400: "#7AA827",
          500: "#5C8519",
          600: "#496B14",
          700: "#3F5B12",
        },
        // Cyan — matches app accent
        cyan: {
          50: "#E6F2FA",
          100: "#C5E0F1",
          200: "#9BC9E5",
          300: "#5BA1CC",
          400: "#3F8FBF",
          500: "#2D7DB8",
          600: "#256594",
        },
        // App ink / surface tones
        ink: {
          DEFAULT: "#1A1430",
          soft: "rgba(26,20,48,0.62)",
          muted: "rgba(26,20,48,0.42)",
        },
        surface: {
          DEFAULT: "#FAF8FF",
          soft: "#F3EFFB",
          card: "#FFFFFF",
          tint: "#F7F4FE",
        },
        nightsurface: {
          DEFAULT: "#0A0712",
          soft: "#100B1B",
          card: "#161122",
        },
      },
      fontFamily: {
        sans: ["Geist", "Inter", "ui-sans-serif", "system-ui"],
        display: ["Geist", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glow: "0 12px 32px -8px rgba(123, 63, 228, 0.35)",
        "glow-lg": "0 24px 48px -12px rgba(123, 63, 228, 0.45)",
        soft: "0 4px 16px -4px rgba(40, 20, 80, 0.08)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [typography],
};
