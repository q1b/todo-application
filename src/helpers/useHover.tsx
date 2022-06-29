import { createSignal, onCleanup, onMount } from "solid-js";

export function useHover<T extends HTMLElement = HTMLDivElement>() {
	const [hovered, setHovered] = createSignal(undefined);
	const [ref, setRef] = createSignal<T>(null);
	const onMouseEnter = () => setHovered(true);
	const onMouseLeave = () => setHovered(false);

	onMount(() => {
		if (ref()) {
			ref().addEventListener("mouseenter", onMouseEnter);
			ref().addEventListener("mouseleave", onMouseLeave);
			onCleanup(() => {
				ref()?.removeEventListener("mouseenter", onMouseEnter);
				ref()?.removeEventListener("mouseleave", onMouseLeave);
			});
		}
	});

	return { setRef, hovered };
}
