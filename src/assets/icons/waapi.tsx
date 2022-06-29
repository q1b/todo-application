// Solid-js version 1.4
import HeroiconsSolidArrowCircleRight from "~icons/fluent/checkbox-checked-24-filled";
import HeroiconsOutlineArrowCircleRight from "~icons/fluent/checkbox-checked-24-regular";

import { easeElastic4, easeSquish5 } from "@/helpers/VisualsHelpers/easing";
import {
	ComponentProps,
	createEffect,
	createSignal,
	on,
	splitProps,
} from "solid-js";

export const ArrowRight = (
	props: ComponentProps<"button"> & {
		svgClass?: string;
	}
) => {
	const [local, others] = splitProps(props, [
		"ref",
		"children",
		"class",
		"svgClass",
	]);
	const [active, setActive] = createSignal(false);
	const [pressed, setPressed] = createSignal(false);

	let defaultContainerRef: HTMLElement;
	let activeContainerRef: HTMLElement;

	createEffect(
		on(active, (v, p) => {
			if (v) {
				let leavingAnim: Animation = defaultContainerRef.animate(
					{
						opacity: [0],
						transform: ["scale(0.95)"],
					},
					{
						fill: "forwards",
						duration: 100,
						easing: easeElastic4,
					}
				);
				leavingAnim.onfinish = () => {
					console.log("mouse-enter-default-container");
					leavingAnim.commitStyles();
					leavingAnim.cancel();
				};
				let enteringAnim = activeContainerRef.animate(
					{
						opacity: [1],
						transform: ["scale(0.95)"],
					},
					{
						fill: "forwards",
						duration: 300,
						easing: easeElastic4,
					}
				);
				enteringAnim.onfinish = () => {
					console.log("mouse-enter-active-container");
					enteringAnim.commitStyles();
					enteringAnim.cancel();
				};
			} else {
				let enteringAnim = activeContainerRef.animate(
					{
						opacity: [0],
						transform: ["scale(0.95)", "scale(1)"],
					},
					{
						fill: "forwards",
						duration: 50,
						easing: easeSquish5,
					}
				);
				enteringAnim.onfinish = () => {
					console.log("mouse-leave-active-container");
					enteringAnim.commitStyles();
					enteringAnim.cancel();
				};
				let leavingAnim = defaultContainerRef.animate(
					{
						opacity: [1],
						transform: ["scale(0.95)", "scale(1)"],
					},
					{
						fill: "forwards",
						duration: 100,
						easing: "ease-out",
					}
				);
				leavingAnim.onfinish = () => {
					console.log("mouse-leave-default-container");
					leavingAnim.commitStyles();
					leavingAnim.cancel();
				};
			}
		})
	);

	const level1 = "#c2e7ff";
	const level9 = "#041e49";
	const level2 = "#7fcfff";
	const level3 = "#5ab3f0";

	createEffect(
		on(pressed, (v, p) => {
			if (v) {
				let enteringAnim = activeContainerRef.animate(
					{
						transform: ["scale(0.90)"],
					},
					{
						fill: "forwards",
						duration: 100,
						easing: easeElastic4,
					}
				);
				enteringAnim.onfinish = () => {
					console.log("mouse-enter-active-container");
					enteringAnim.commitStyles();
					enteringAnim.cancel();
				};
			} else {
				let enteringAnim = activeContainerRef.animate(
					{
						transform: ["scale(0.95)"],
					},
					{
						fill: "forwards",
						duration: 50,
						easing: easeSquish5,
					}
				);
				enteringAnim.onfinish = () => {
					console.log("mouse-leave-active-container");
					enteringAnim.commitStyles();
					enteringAnim.cancel();
				};
			}
		})
	);
	return (
		<button
			onPointerDown={() => setPressed(true)}
			onPointerUp={() => setPressed(false)}
			onPointerEnter={() => setActive(true)}
			onPointerLeave={() => setActive(false)}
			onFocus={() => setActive(true)}
			onBlur={() => setActive(false)}
			class="relative"
			{...others}
		>
			<div ref={(el) => (defaultContainerRef = el)}>
				<HeroiconsOutlineArrowCircleRight
					shape-rendering="geometricPrecision"
					class={local?.svgClass ? local.svgClass : "w-8 h-8"}
				/>
			</div>
			<div ref={(el) => (activeContainerRef = el)} class="absolute top-0">
				<HeroiconsSolidArrowCircleRight
					shape-rendering="geometricPrecision"
					class={local?.svgClass ? local.svgClass : "w-8 h-8"}
				/>
			</div>
		</button>
	);
};
