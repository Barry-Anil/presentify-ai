import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			'creative-ai-gradient': 
			'var(--Project-Color-Styles-CreativeAI-Gradient, #F55C7A)',
			background: {
				DEFAULT: 'hsl(var(--background))',
				primary:  'hsl(var(--background-primary))',
				90: 'hsl(var(--background-90))',
				80: 'hsl(var(--background-80))',
				70: 'hsl(var(--background-70))',
				25: 'hsl(var(--background-25))',
				20: 'hsl(var(--background-20))',
			},
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				primary:  'hsl(var(--card-foreground))',
				'primary-80': 'hsl(var(--primary-80))',
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))',
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				primary:  'hsl(var(--primary-foreground))',
				90: 'hsl(var(--primary-90))',
				80: 'hsl(var(--primary-80))',
				20: 'hsl(var(--primary-20))',
				10: 'hsl(var(--primary-10))',
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))',
				90: 'hsl(var(--secondary-90))',
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))',
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))',
			},
			destructives: {
				DEFAULT: 'hsl(var(--destructives))',
				foreground: 'hsl(var(--destructives-foreground))',
			},
			border: {
				DEFAULT:  'hsl(var(--border))',
				vivid: 'var(--creative-ai-gradient)',
			},
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))',
			},
			sidebar: {
				DEFAULT: 'hsl(var(--sidebar))',
				foreground: 'hsl(var(--sidebar-foreground))',
				primary: 'hsl(var(--sidebar-primary))',
				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
				accent: 'hsl(var(--sidebar-accent))',
				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
				border: 'hsl(var(--sidebar-border))',
				ring: 'hsl(var(--sidebar-ring))',
			},
		},
		backgroundImage: {
			'vivid-gradient': 'var(--creative-ai-gradient)',
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
  	},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config
