import pluginAnimate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme.js";

/**
 * @type {import('tailwindcss').Config}
 */
const preset = {
  theme: {
    extend: {
      fontSize: {
        ...defaultTheme.fontSize,
        xxs: ["10px", { lineHeight: "12px" }],
        xs: ["12px", { lineHeight: "14.4px" }],
        sm: ["14px", { lineHeight: "16.8px" }],
        base: ["16px", { lineHeight: "19.2px" }],
        lg: ["18px", { lineHeight: "21.6px" }],
        xl: ["20px", { lineHeight: "24px" }],
        "2xl": ["24px", { lineHeight: "28.8px" }],
        "3xl": ["32px", { lineHeight: "38.4px" }],
      },
      fontFamily: {
        sans: ["Avenir Next LT Pro", ...defaultTheme.fontFamily.sans],
      },
      fontMetrics: {
        // Keys here must match those in fontFamily.
        sans: {
          capHeight: 722,
          ascent: 756,
          descent: -300,
          lineGap: 200,
          unitsPerEm: 1000,
        },
      },

      colors: {
        background: "#F8F8FB",
        foreground: "#171717",

        neutral: {
          50: "#ffffff",
          100: "#f5f5f5",
          200: "#f1f1f1",
          300: "#d9d9d9",
          400: "#c4c4c4",
          500: "#9d9d9d",
          600: "#7b7b7b",
          700: "#555555",
          800: "#434343",
          900: "#000000",
        },

        success: {
          50: "#e3f5ed",
          100: "#bae6d1",
          200: "#8cd6b5",
          300: "#54c797",
          400: "#0fbb81",
          500: "#00af6c",
          600: "#00a061",
          700: "#008d54",
          800: "#007c47",
          900: "#005d31",
        },

        warning: {
          50: "#fffde6",
          100: "#fff9c1",
          200: "#fff597",
          300: "#fff06c",
          400: "#ffeb47",
          500: "#fee61a",
          600: "#ffd920",
          700: "#ffa700",
          800: "#fe900f",
          900: "#fe700d",
        },

        error: {
          50: "#ffe9ed",
          100: "#ffc9ce",
          200: "#f09393",
          300: "#e56869",
          400: "#ee4343",
          500: "#f22c25",
          600: "#e31f25",
          700: "#d20f20",
          800: "#c50018",
          900: "#b5000b",
        },

        primary: {
          50: "#e2f2ff",
          100: "#b9ddff",
          200: "#7eafff",
          300: "#52b2ff",
          400: "#1aa0ff",
          500: "#008fff",
          600: "#0080ff",
          700: "#176cf7",
          800: "#1257c6",
          900: "#0c377c",
        },

        secondary: {
          50: "#fff8e1",
          100: "#ffecb4",
          200: "#ffe084",
          300: "#ffd552",
          400: "#ffca2e",
          500: "#ffc117",
          600: "#ffb311",
          700: "#fea010",
          800: "#fe900f",
          900: "#fe700d",
        },

        "buyer-seller": {
          50: "#e8ebf7",
          100: "#c4cdeb",
          200: "#9daddd",
          300: "#758ccf",
          400: "#5573c5",
          500: "#325abb",
          600: "#2b52b1",
          700: "#2048a5",
          800: "#163e99",
          900: "#176cf7",
        },

        "muat-parts-member": {
          50: "#f6e6e8",
          100: "#eac0c3",
          200: "#cb8683",
          300: "#b35956",
          400: "#b43832",
          500: "#b02316",
          600: "#a31a17",
          700: "#931012",
          800: "#86090c",
          900: "#770000",
        },

        "muat-parts-non": {
          50: "#ffeaec",
          100: "#ffcccd",
          200: "#ef9892",
          300: "#e47168",
          400: "#ec5241",
          500: "#ef4422",
          600: "#e03923",
          700: "#cf2e1d",
          800: "#c22716",
          900: "#b31b06",
        },

        "muat-trans": {
          50: "#f8f8f0",
          100: "#f0f0e8",
          200: "#e5e5dd",
          300: "#d4d4cc",
          400: "#afafa7",
          500: "#8f8f87",
          600: "#676760",
          700: "#54544d",
          800: "#36362f",
          900: "#770000",
        },

        "muat-trans-primary": {
          50: "#fffbeb",
          100: "#fff5c6",
          200: "#ffe988",
          300: "#ffd84a",
          400: "#ffc217",
          500: "#f9a307",
          600: "#dd7b02",
          700: "#b75606",
          800: "#94410c",
          900: "#7a360d",
        },

        "muat-trans-secondary": {
          50: "#ede8e6",
          100: "#dad1cc",
          200: "#c8bbb3",
          300: "#b5a49a",
          400: "#a38d81",
          500: "#907667",
          600: "#7e5f4e",
          700: "#6b4935",
          800: "#59321b",
          900: "#461b02",
        },
      },
      width: {
        "modal-small": "386px",
        "modal-big": "454px",
        "modal-xl": "486px",
      },
      boxShadow: {
        button: "0 -4px 6px rgba(0, 0, 0, 0.1)",
        "button-container": "0 -8px 8px rgba(0, 0, 0, 0.05)",
        "responsive-footer": "0px -8px 16px 2px rgba(0, 0, 0, 0.15)",
        muat: "0 4px 11px 0 #41414140",
      },
      dropShadow: {
        muat: "0 4px 11px rgba(65, 65, 65, 0.25)",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },

        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },

        // For Modal
        "overlay-show": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "content-show": {
          from: {
            opacity: "0",
            transform: "translate(-50%, -50%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        "content-hide": {
          from: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          to: { opacity: "0", transform: "translate(-50%, -50%) scale(0.96)" },
        },

        // For Popover
        "slide-up-and-fade": {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down-and-fade": {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up-and-fade-out": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(2px)" },
        },
        "slide-down-and-fade-out": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(-2px)" },
        },
      },
      animation: {
        enter: "enter 200ms ease-out",
        leave: "leave 150ms ease-in forwards",
        "caret-blink": "caret-blink 1s ease-in-out infinite",
        "collapsible-down": "collapsible-down 200ms ease-out",
        "collapsible-up": "collapsible-up 200ms ease-out",

        // For Modal
        "overlay-show": "overlay-show 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "content-show": "content-show 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "content-hide": "content-hide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        // For Popover
        "slide-up-and-fade":
          "slide-up-and-fade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-and-fade":
          "slide-down-and-fade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up-and-fade-out": "slide-up-and-fade-out 150ms ease-in",
        "slide-down-and-fade-out": "slide-down-and-fade-out 150ms ease-in",
      },
    },
  },
  plugins: [
    pluginAnimate,
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};

export default preset;
