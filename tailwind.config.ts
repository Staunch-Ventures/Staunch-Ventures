/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "9xl": "96rem",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "glass-gradient":
          "radial-gradient(ellipse 60% 80% at top right, hsla(0, 0%, 100%, 0.2), transparent), radial-gradient(ellipse 60% 80% at bottom left, hsla(0, 0%, 100%, 0.1), transparent)",
        "glass-gradient-primary":
          "radial-gradient(ellipse 60% 80% at top right, hsl(var(--primary) / 0.25), transparent), radial-gradient(ellipse 60% 80% at bottom left, hsl(var(--primary) / 0.15), transparent)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
