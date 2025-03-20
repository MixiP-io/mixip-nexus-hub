
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				mixip: {
					blue: '#007AFF', // SF Blue
					'blue-dark': '#0055B3',
					mint: '#34C759', // SF Mint
					purple: '#AF52DE', // SF Purple
					orange: '#FF9500', // SF Orange
					'gray-light': '#F5F5F7', // Apple light gray
					'gray-medium': '#86868B', // Apple medium gray
					'gray-dark': '#1D1D1F', // Apple dark gray
				},
				apple: {
					blue: '#0066CC', // Apple blue
					green: '#34C759', // Apple green
					indigo: '#5856D6', // Apple indigo
					orange: '#FF9500', // Apple orange
					pink: '#FF2D55', // Apple pink
					purple: '#AF52DE', // Apple purple
					red: '#FF3B30', // Apple red
					teal: '#5AC8FA', // Apple teal
					yellow: '#FFCC00', // Apple yellow
					'gray-1': '#8E8E93', // lightest gray
					'gray-2': '#636366',
					'gray-3': '#48484A',
					'gray-4': '#3A3A3C',
					'gray-5': '#2C2C2E',
					'gray-6': '#1C1C1E', // darkest gray
				},
				// Rich Frame.io inspired colors
				frameio: {
					'bg-dark': 'hsl(var(--frameio-bg-dark))',
					'bg-card': 'hsl(var(--frameio-bg-card))',
					'bg-highlight': 'hsl(var(--frameio-bg-highlight))',
					'bg-hover': 'hsl(var(--frameio-bg-hover))',
					'border-subtle': 'hsl(var(--frameio-border-subtle))',
					'text-primary': 'hsl(var(--frameio-text-primary))',
					'text-secondary': 'hsl(var(--frameio-text-secondary))',
					'text-tertiary': 'hsl(var(--frameio-text-tertiary))',
					'accent-blue': 'hsl(var(--frameio-accent-blue))',
					'accent-green': 'hsl(var(--frameio-accent-green))',
					'accent-yellow': 'hsl(var(--frameio-accent-yellow))',
					'accent-red': 'hsl(var(--frameio-accent-red))',
					'accent-purple': 'hsl(var(--frameio-accent-purple))',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1rem',
				'2xl': '1.25rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in': {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' },
				},
				'zoom-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' },
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 0 rgba(61, 139, 253, 0)' },
					'50%': { boxShadow: '0 0 15px rgba(61, 139, 253, 0.3)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'spin-slow': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' },
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-up': 'fade-up 0.8s ease-out',
				'slide-in': 'slide-in 0.4s ease-out',
				'zoom-in': 'zoom-in 0.5s cubic-bezier(0.2, 0, 0.2, 1)',
				'pulse-glow': 'pulse-glow 2s infinite',
				'float': 'float 6s ease-in-out infinite',
				'spin-slow': 'spin-slow 3s linear infinite',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
			},
			backdropBlur: {
				xs: '2px',
				sm: '4px',
				md: '8px',
				lg: '12px',
				xl: '16px',
			},
			boxShadow: {
				'apple-sm': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.12)',
				'apple-md': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
				'apple-lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
				'apple-xl': '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
				'apple-glow': '0 0 10px rgba(0, 122, 255, 0.5)',
				// Enhanced Frame.io inspired shadows
				'frame-card': '0 2px 6px 0 rgba(0, 0, 0, 0.25)',
				'frame-dropdown': '0 4px 12px rgba(0, 0, 0, 0.25)',
				'frame-modal': '0 10px 25px rgba(0, 0, 0, 0.35)',
				'frame-highlight': '0 0 0 2px rgba(61, 139, 253, 0.5)',
				'frame-hover': '0 0 0 1px rgba(61, 139, 253, 0.3)',
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
			},
			transitionTimingFunction: {
				'ease-spring': 'cubic-bezier(0.25, 0.1, 0.25, 1.5)',
			},
			transitionDuration: {
				'400': '400ms',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
