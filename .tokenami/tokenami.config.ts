import { createConfig } from "@tokenami/css";

export default createConfig({
	include: ["./src/**/*.{ts,tsx}"],
	grid: "0.25rem",
	responsive: {},
	theme: {
		alpha: {},
		anim: {},
		border: {},
		color: {
			cf: "#DE7622",
			"cf-500": "#E99556",
			overlay: "#3C3C46",
		},
		ease: {},
		"font-size": {},
		leading: {},
		"line-style": {},
		radii: {
			full: "9999px",
		},
		size: {
			full: "100%",
		},
		shadow: {
			cf: "0 0 0 5px #DE762298",
		},
		surface: {},
		tracking: {},
		transition: {},
		weight: {},
		z: {},
	},
});
