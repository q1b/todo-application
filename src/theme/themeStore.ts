import { createStore } from "solid-js/store";

export const [theme, setTheme] = createStore < {
    value: "light" | "dark" | string,
    sound: boolean,
}>({
    value: "light",
    sound: true
});
