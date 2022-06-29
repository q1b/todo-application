const plugin = require("tailwindcss/plugin");
/*
=> flattenColorPalette Taken from Tailwindcss Github Repo
{
  rose:{                     {
    100:'hsl(0,100%,90%)',      rose-100:'hsl(0,100%,90%)',
    200:'hsl(0,100%,80%)', =>   rose-200:'hsl(0,100%,80%)',
    300:'hsl(0,100%,70%)',      rose-300:'hsl(0,100%,70%)',
  }                          }
}                          
*/
const flattenColorPalette = (colors) =>
	Object.assign(
		{},
		...Object.entries(colors).flatMap(([color, values]) =>
			typeof values == "object"
				? Object.entries(flattenColorPalette(values)).map(
						([number, hex]) => ({
							[color +
							(number === "DEFAULT" ? "" : `-${number}`)]: hex,
						}),
				  )
				: [{ [`${color}`]: values }],
		),
	);

function createSinglePallete(color, colors) {
	let boxShadow = {};
	boxShadow[color] = {};
	for (let i = 0; i < 9; i++) {
		boxShadow[color][
			`${i + 1}00`
		] = `inset 0px 0px 10px 1px #ffffff,inset 0px 0px 50px 10px ${
			colors[color][`${i + 1}00`]
		},0px 0px 10px 3px ${colors[color][`${i}00`]}44`;
	}
	return flattenColorPalette({ ...boxShadow });
}
function allBoxShadow(colors) {
	let storage = {};
	Object.keys(colors)
		.filter((firstColor) => firstColor !== "lightBlue")
		.forEach((firstColor) => {
			storage[firstColor] = {};
			for (let i = 0; i < 9; i++) {
				storage[firstColor][`${i + 1}00`] = {};
				let boxShadow = {};
				Object.keys(colors)
					.filter((secondColor) => secondColor !== "lightBlue")
					.forEach((secondColor) => {
						boxShadow[secondColor] = {};
						for (let i = 0; i < 9; i++) {
							boxShadow[secondColor][
								`${i + 1}00`
							] = `inset 0px 0px 10px 1px #ffffff,inset 0px 0px 50px 10px ${
								colors[firstColor][`${i + 1}00`]
							},0px 0px 10px 3px ${
								colors[secondColor][`${i + 1}00`]
							}44`;
						}
					});
				storage[firstColor][`${i + 1}00`] = flattenColorPalette({
					...boxShadow,
				});
			}
		});
	return flattenColorPalette(storage);
}
/*`${Default color Schema}`
  Rose , Blue , Green , BlueGray , Yellow 
*/
boxShadowColorConfig = {
	rose: {
		50: "#fff1f2",
		100: "#ffe4e6",
		200: "#fecdd3",
		300: "#fda4af",
		400: "#fb7185",
		500: "#f43f5e",
		600: "#e11d48",
		700: "#be123c",
		800: "#9f1239",
		900: "#881337",
	},
	blue: {
		50: "#eff6ff",
		100: "#dbeafe",
		200: "#bfdbfe",
		300: "#93c5fd",
		400: "#60a5fa",
		500: "#3b82f6",
		600: "#2563eb",
		700: "#1d4ed8",
		800: "#1e40af",
		900: "#1e3a8a",
	},
	green: {
		50: "#f0fdf4",
		100: "#dcfce7",
		200: "#bbf7d0",
		300: "#86efac",
		400: "#4ade80",
		500: "#22c55e",
		600: "#16a34a",
		700: "#15803d",
		800: "#166534",
		900: "#14532d",
	},
	yellow: {
		50: "#fefce8",
		100: "#fef9c3",
		200: "#fef08a",
		300: "#fde047",
		400: "#facc15",
		500: "#eab308",
		600: "#ca8a04",
		700: "#a16207",
		800: "#854d0e",
		900: "#713f12",
	},
	blueGray: {
		50: "#f8fafc",
		100: "#f1f5f9",
		200: "#e2e8f0",
		300: "#cbd5e1",
		400: "#94a3b8",
		500: "#64748b",
		600: "#475569",
		700: "#334155",
		800: "#1e293b",
		900: "#0f172a",
	},
};
const boxShadowAll = allBoxShadow(boxShadowColorConfig);
// module.exports = boxShadowAll

const boxShadow = plugin(
	function ({}) {
		return null;
	},
	{
		theme: {
			boxShadow: {
				...boxShadowAll,
			},
		},
	},
);

module.exports = boxShadow;
