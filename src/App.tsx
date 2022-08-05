import PixelGrid from "@/assets/pixel-grid.svg";
import { SpeakerButton, theme, ThemeButton } from "@/theme";
import { Routes, Route } from "solid-app-router";
import { ShareIcon } from "@/assets/icons";

import { Component, createEffect, createMemo, createRenderEffect, createSignal, lazy, on, onMount } from "solid-js";

/** Todo Application for future */
/**
 * easy to use & simple by default,
 * no need for signup,
 * Share with friends or company
 */

const Default = lazy(() => import("./routes/default"));
const Shared = lazy(() => import("./routes/shared"));
const [height, setHeight] = createSignal(0);

const [ref,setRef] = createSignal<null|HTMLElement>()

export const updateHeight = () => {
    setHeight(() => ref().getBoundingClientRect().height)
}

const App: Component = () => {
    setTimeout(() => {
        updateHeight()
    },1000)
    const [styles, setStyles] = createSignal({
        "background-image": `linear-gradient(
          135deg,
          hsla(211deg, 44%,20%,0) 0%,
          hsla(205deg, 63%, 21%,0.1) 5%,
          hsla(198deg, 100%, 19%,0.1) 10%,
          hsla(197deg, 100%, 22%,0.15) 14%,
          hsla(196deg, 100%, 24%,0.2) 19%,
          hsla(194deg, 100%, 25%,0.2) 24%,
          hsla(191deg, 100%, 27%,0.3) 29%,
          hsla(189deg, 100%, 28%,0.32) 33%,
          hsla(185deg, 100%, 28%,0.34) 38%,
          hsla(181deg, 100%, 28%,0.4) 43%,
          hsla(176deg, 100%, 30%,0.3) 48%,
          hsla(171deg, 100%, 32%,0) 100%
        )`
    })
    createEffect(on(() => theme.value, (v) => {
        if (v === 'light') {
            setStyles({
                "background-color": `transparent`
            })
        } else {
            setStyles({
                      "background-image": `linear-gradient(
          135deg,
          hsla(211deg, 44%,20%,0) 0%,
          hsla(205deg, 63%, 21%,0.1) 5%,
          hsla(198deg, 100%, 19%,0.1) 10%,
          hsla(197deg, 100%, 22%,0.15) 14%,
          hsla(196deg, 100%, 24%,0.2) 19%,
          hsla(194deg, 100%, 25%,0.2) 24%,
          hsla(191deg, 100%, 27%,0.3) 29%,
          hsla(189deg, 100%, 28%,0.32) 33%,
          hsla(185deg, 100%, 28%,0.34) 38%,
          hsla(181deg, 100%, 28%,0.4) 43%,
          hsla(176deg, 100%, 30%,0.3) 48%,
          hsla(171deg, 100%, 32%,0) 100%
        )`  
            })
        }
    }))
	return (
		<>
            <main ref={(el) => setRef(el) } style={styles()} class="z-10 pb-10 min-h-screen relative flex flex-col items-center gap-y-3 sm:gap-y-5 md:gap-y-7">
				<nav class="flex w-full place-content-end px-4 pt-4 ">
                    <div class="flex gap-x-4 items-center">
						<ThemeButton size={24} />
						<SpeakerButton size={24} />
					</div>
				</nav>
                <Routes>
					<Route path="/" element={<Default />} />
					<Route path="/:id" element={<Shared />} />
				</Routes>
            </main>
			<div class="bg-white dark:bg-slate-900 absolute inset-0 w-full h-full transition-colors">
				<div
					style={{
						"background-image": `url(${PixelGrid})`,
					}}
					class={`absolute [mask-image:linear-gradient(rgba(0,0,0,1),transparent)] dark:[mask-image:linear-gradient(rgb(255,255,255),transparent)] inset-0 bg-center`}
				></div>
            </div>
            <div class="bg-white dark:bg-slate-900 -z-10 absolute top-0 w-full min-h-screen" style={{ height: `${height()}px` }}></div>
		</>
	);
};

export default App;
