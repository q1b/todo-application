import PixelGrid from "@/assets/pixel-grid.svg";
import { SpeakerButton, theme, ThemeButton } from "@/theme";
import { Routes, Route } from "solid-app-router";

import { ShareIcon } from "@/assets/icons";

import { Component, lazy } from "solid-js";

/** Todo Application for future */
/**
 * easy to use & simple by default,
 * no need for signup,
 * Share with friends or company
 */

const Default = lazy(() => import("./routes/default"));
const Shared = lazy(() => import("./routes/shared"));

const App: Component = () => {
	return (
		<>
			<main class="z-10 bg-transparent relative flex flex-col items-center gap-y-3 sm:gap-y-5 md:gap-y-7">
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
		</>
	);
};

export default App;
