const buildMaterial = require("./build/index.js");
const { join } = require("path");
const template = require("./utils/index");

// Thing on Using YAML
// const YAML = require("yaml")
// const file = fs.readFileSync("./file.yml", "utf8")
// YAML.parse(file)

const RequiredIcons = [
	{
		outline: "heroicons-outline:arrow-circle-right",
		solid: "heroicons-solid:arrow-circle-right",
		name: "AcademicCap",
	},
	{
		outline: "fluent:add-square-multiple-16-regular",
		solid: "fluent:add-square-multiple-16-filled",
		name: "Add",
    },
	{
		outline: "heroicons-outline:trash",
		solid: "heroicons-solid:trash",
		name: "Trash",
    },
	{
		outline: "fluent:checkbox-checked-24-regular",
		solid: "fluent:checkbox-checked-24-filled",
		name: "FluentCheckBox",
	},
	{
		outline: "heroicons-outline:badge-check",
		solid: "heroicons-solid:badge-check",
		name: "CheckBoxBadge",
    },
    {
        outline: "fluent:checkbox-unchecked-24-regular",
        solid: "fluent:checkbox-unchecked-24-filled",
        name:"FluentUnCheckedBox"
    },
	{
		outline: "heroicons-outline:check-circle",
		solid: "heroicons-solid:check-circle",
		name: "CheckBoxCircle",
	},
	{
		outline: "fluent:share-48-regular",
		solid: "fluent:share-48-filled",
		name: "Share",
	},
	{
		path: "eos-icons:loading",
		name: "Loading",
	},
];

let preFile = `
import { ComponentProps, splitProps } from "solid-js"
type IconProps<P = {}> = P & {
    size?: number
    basic?: boolean
}`;

RequiredIcons.forEach((detail) => (preFile += template(detail)));

buildMaterial(
	join(__dirname, "../", "../", "src", "assets", "icons", "index.tsx"),
	preFile,
);
