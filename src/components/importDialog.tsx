import { ease3, easeElastic2, easeInOut2, easeSquish1, easeSquish3 } from "@/helpers/VisualsHelpers/easing"

import { createEffect, createMemo, For, onMount, Setter } from "solid-js"

const Dialog = (props: { closeEvent: any; listSetter:Setter<string[]> }) => {
	let overlayRef: HTMLElement
	let panelRef: HTMLElement
	let containerRef: HTMLElement
	const onFinish = (Animation: Animation) => {
		Animation.onfinish = () => {
			Animation.commitStyles()
			Animation.cancel()
		}
	}
	let animDur = 400
	let leaveDur = 800
	onMount(() => {
		const overlayAnimation = overlayRef.animate(
			{
				opacity: [0, 1],
				// background:['#FFF','#000'],
			},
			{
				duration: animDur,
				fill: "both",
				easing: easeSquish1,
			}
		)
		onFinish(overlayAnimation)
		const panelAnimation = panelRef.animate(
			{
				// opacity: [0, 1],
				// background:['#FFF','#000'],
			},
			{
				duration: animDur,
				fill: "both",
				easing: easeElastic2,
			}
		)
		onFinish(panelAnimation)
		const containerAnimation = containerRef.animate(
			{
				transform: ["scale(1.08)", "scale(1)"],
				opacity: [0, 1],
				// background:['#FFF','#000'],
			},
			{
				duration: animDur,
				fill: "both",
				easing: easeSquish3,
			}
		)
		onFinish(containerAnimation)
	})
	const onExit = () => {
		const overlayAnimation = overlayRef.animate(
			{
				opacity: [1, 0],
				// background:['#FFF','#000'],
			},
			{
				duration: leaveDur,
				fill: "both",
				easing: ease3,
			}
		)
		overlayAnimation.onfinish = () => overlayAnimation.cancel()
		const panelAnimation = panelRef.animate(
			{
				// opacity: [0, 1],
				// background:['#FFF','#000'],
			},
			{
				duration: leaveDur,
				fill: "both",
				easing: easeInOut2,
			}
		)
		panelAnimation.onfinish = () => panelAnimation.cancel()

		const containerAnimation = containerRef.animate(
			{
				transform: ["translateY(0px) scale(1)", "translateY(56%) scale(0)"],
				opacity: [1, 0.45, 0],
			},
			{
				duration: leaveDur,
				fill: "both",
				easing: easeSquish3,
			}
		)
		containerAnimation.onfinish = () => containerAnimation.cancel()
    }
    const [input, setInput] = createSignal("");
    const placeholder = `Just Enter Item in your way, 
Item1st
Item2nd
Item3rd
...Item(N-1)th
ItemNth
    `
	return (
		<section
			role="dialog"
			aria-modal="true"
			id="modal-title"
			aria-labelledby="modal-title"
			class="overflow-y-auto fixed inset-0 z-50"
		>
			{/* <!-- Overlay --> */}
			<div
				// x-show="isOpen"
				ref={(el: HTMLDivElement) => (overlayRef = el)}
				// x-transition.opacity.duration.500ms
				class="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
			></div>
			{/* <!-- Panel --> */}
			<div
				ref={(el: HTMLDivElement) => (panelRef = el)}
				class="flex relative flex-col justify-center items-center min-h-screen max-h-screen px-12"
				onClick={() => {
					onExit()
					setTimeout(() => {
                        props?.listSetter(input().split('\n'))
						props.closeEvent()
					}, leaveDur - 65)
				}}
			>
				<main
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
					}}
					// x-on:click.stop
					// x-trap.noscroll.inert="isOpen"
					ref={(el: HTMLElement) => (containerRef = el)}
					id="dialog-container"
					class="mx-10 relative max-w-4xl px-8 py-6 flex flex-col gap-y-4 rounded-2xl bg-white shadow-lg border-t"
                >
                    <textarea onChange={(e) => {
                        setInput(e.currentTarget.value)
                    }} value={input()} placeholder={ placeholder } name="input_todos_as_list" rows={8} id="input_todos_as_list" class="resize w-full block px-3 py-1.5 text-base font-normal text-slate-700  border border-solid border-gray-300  focus:text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"></textarea>
                    <button 				onClick={() => {
					onExit()
					setTimeout(() => {
                        props?.listSetter(input().split('\n'))
						props.closeEvent()
					}, leaveDur - 65)
				}} class="px-2 py-1.5 bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 active:bg-blue-600 flex items-center justify-center w-max rounded-md transition-colors" >
                        <span class="text-[13px] font-bold inline-flex items-center text-white leading-3 gap-x-3">
                            done
                        </span>
                    </button>
				</main>
			</div>
		</section>
	)
}

import { createSignal, Show } from "solid-js"
import { Portal } from "solid-js/web"

export const ImportDialogButton = (props: {listSetter:Setter<string[]>}) => {
	const [isModelOpen, setModelState] = createSignal(false)
	const openModel = () => setModelState(true)
	const closeModel = () => setModelState(false)
	return (
		<>
			<button
                style={{
                    "width": "58.203125px",
                    "height": "24px",
                    "top": "16px",
                    "right": "93.797px"
                }}
				class="px-2 py-1.5 absolute bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 active:bg-blue-600 flex items-center justify-center w-full rounded-full transition-colors"
				onClick={() => {
					openModel()
				}}
			>
				<span class="text-[13px] font-bold inline-flex items-center text-white leading-3 gap-x-3">
					import
				</span>
			</button>
			<Show when={isModelOpen()}>
				<Portal>
					<Dialog listSetter={props.listSetter}  closeEvent={closeModel} />
				</Portal>
			</Show>
		</>
	)
}
