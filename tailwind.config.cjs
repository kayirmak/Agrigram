/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				"2xl": { "max": "1536px" },
				"xl": { "max": "1280px" },
				"lg": { "max": "1023px" },
				"lm": { "max": "962px" },
				"md": { "max": "767px" },
				"sm": { "max": "640px" },
				"xb": { "max": "414px" },
				"mb": { "max": "375px" }
			},
			colors: {
				"main": "#FF5714",
				"main-dark": "#F14500",
				"main-light": "#FF6E34",
				"main-bright": "#FF8F62",
				"white": "#FFFEFF",
				"black": "#000000",
				"grey": "#4F4F4F",
				"grey-light": "#828282",
				"grey-bright": "#BDBDBD",
				"grey-darkest": "#151515",
				"blackGrey": "#1E232C",
				"grey6A": "#6A707C",
				"grey83": "#838BA1",
				"greyf2": "#F2F2F2"
			},
			fontFamily: {
				"roboto": ["Roboto", "sans-serif"],
				"poppins": ["Poppins", "sans-serif"],
				"urbanist": ["Urbanist", "sans-serif"]
			},
			backgroundImage: {
				"search-icon": "url('./src/assets/imgs/header-icons/search.svg')",
				"custom-arrow": "url('./src/assets/imgs/header-icons/arrow.svg')",
				"cat-item-icon-arrow":
					"url('./src/assets/imgs/category-icons/category-item-icon-arrow.svg')"
			},
			boxShadow: {
				"grayShadow": "0px 10px 20px rgba(204, 204, 204, 0.4)",
				"swiperShadow": "0px 9px 18px rgba(204, 204, 204, 0.4)"
			},
		},
	},
	plugins: [],
};
