/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			spacing: {
				"13": "3.25rem",
				"18": "4.5rem",
				"4.5": "1.125rem",
			},
			scale: {
				"102": "1.02",
				"103": "1.03",
				"105": "1.05",
				"108": "1.08",
				"110": "1.1",
			},
			colors: {
				midnight: {
					950: "#05070E",
					900: "#080B16", // Background
					850: "#0C1020",
					800: "#11162A", // Secondary background
					700: "#18203B",
					600: "#222D52",
				},
				aurora: {
					purple: "#9B5CFF", // Primary accent
					cyan: "#32D9FF",   // Secondary accent
					pink: "#FF5CA8",   // Highlight
					indigo: "#6366F1",
					violet: "#8B5CF6",
				},
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
			},
			keyframes: {
				"aurora-flow": {
					"0%, 100%": {
						transform: "translate(0px, 0px) scale(1)",
						opacity: "0.45",
					},
					"50%": {
						transform: "translate(30px, -20px) scale(1.1)",
						opacity: "0.7",
					},
				},
				"aurora-pulse": {
					"0%, 100%": { opacity: "0.4", transform: "scale(1)" },
					"50%": { opacity: "0.8", transform: "scale(1.05)" },
				},
				"equalizer-1": {
					"0%, 100%": { height: "20%" },
					"50%": { height: "95%" },
				},
				"equalizer-2": {
					"0%, 100%": { height: "70%" },
					"50%": { height: "30%" },
				},
				"equalizer-3": {
					"0%, 100%": { height: "40%" },
					"50%": { height: "100%" },
				},
				"equalizer-4": {
					"0%, 100%": { height: "90%" },
					"50%": { height: "25%" },
				},
				glow: {
					"0%, 100%": { opacity: "0.6" },
					"50%": { opacity: "1" },
				},
				"slide-up": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				shimmer: {
					"0%": { backgroundPosition: "-400px 0" },
					"100%": { backgroundPosition: "400px 0" },
				},
			},
			animation: {
				"aurora-flow": "aurora-flow 12s ease-in-out infinite",
				"aurora-pulse": "aurora-pulse 6s ease-in-out infinite",
				"equalizer-1": "equalizer-1 0.8s ease-in-out infinite",
				"equalizer-2": "equalizer-2 0.7s ease-in-out infinite 0.15s",
				"equalizer-3": "equalizer-3 0.9s ease-in-out infinite 0.3s",
				"equalizer-4": "equalizer-4 0.65s ease-in-out infinite 0.1s",
				glow: "glow 3s ease-in-out infinite",
				"slide-up": "slide-up 0.3s ease-out",
				"fade-in": "fade-in 0.3s ease-out",
				shimmer: "shimmer 1.6s ease-in-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
