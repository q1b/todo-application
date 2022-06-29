import { baseURL } from "@/api/api";
import { createEffect, onCleanup, Show } from "solid-js";
import { createStore } from "solid-js/store";

export function Share(props: {
	initial_id: string;
	onShareStart: () => any;
	onShareComplete: () => any;
	dirty: boolean;
	type: "Default" | "Shared";
	body: any;
}) {
	const [store, setStore] = createStore({
		state: "disabled",
		path: props.initial_id,
		errorText: undefined,
	});
	createEffect(() => {
		if (props.dirty) {
			setStore({ state: "idle" });
		}
	});

	createEffect(() => {
		setStore((current) =>
			current.state === "idle" || current.state === "disabled"
				? { state: "disabled", path: props.initial_id }
				: current
		);
	});

	createEffect(
		() => {
			let current = true;
			if (store.state === "loading") {
				if (props.onShareStart) props.onShareStart();
				window
					.fetch(`${baseURL}/todo_group`, {
						method: "POST",
						headers: {
							"content-type": "application/json",
						},
						body: JSON.stringify(props.body),
					})
					.then((res) => {
						if (!res.ok) throw res;
						return res;
					})
					.then((res) => res.json())
					.then((res) => {
						if (current) {
							console.log("RES", res);
							const newPath = `/${res.id}`;
							if (props.onShareComplete) props.onShareComplete();
							navigator.clipboard
								.writeText(window.location.origin + newPath)
								.then(() => {
									if (current) {
										setStore({
											state: "copied",
											path: newPath,
										});
									}
								})
								.catch(() => {
									if (current) {
										setStore({
											state: "disabled",
											path: newPath,
										});
									}
								});
						}
					})
					.catch((error) => {
						if (!current) return;
						const defaultErrorText =
							"Whoops! Something went wrong.";
						if (error instanceof window.Response) {
							error.json().then((response) => {
								if (!current) return;
								if (
									typeof response.errors === "object" &&
									response.errors !== null &&
									!Array.isArray(response.errors)
								) {
									setStore({
										state: "error",
										errorText:
											response.errors[
												Object.keys(response.errors)[0]
											][0] || defaultErrorText,
									});
								} else {
									setStore({
										state: "error",
										errorText: defaultErrorText,
									});
								}
							});
						} else {
							setStore({
								state: "error",
								errorText: defaultErrorText,
							});
						}
					});
			} else if (store.state === "copied") {
				window.setTimeout(() => {
					setStore(({ state, path: currentPath }) =>
						state === "copied" && currentPath === store.path
							? { state: "disabled", path: currentPath }
							: { state, path: currentPath }
					);
				}, 1500);
			}
			onCleanup(() => {
				current = false;
			});
		}
		//   [state, path, editorRef, onShareStart, onShareComplete, tailwindVersion]
	);

	return (
		<div class="hidden sm:flex items-center space-x-4 min-w-0">
			<button
				type="button"
				class="relative flex-none rounded-md text-sm font-semibold leading-6 py-1.5 px-3"
				classList={{
					"bg-sky-500/40 text-white dark:bg-gray-800 dark:text-white/40":
						store.state === "disabled",
					"cursor-auto":
						store.state === "disabled" ||
						store.state === "copied" ||
						store.state === "loading",
					"hover:bg-sky-400":
						store.state !== "disabled" &&
						store.state !== "copied" &&
						store.state !== "loading",
					"bg-sky-500 text-white":
						store.state === "idle" || store.state === "loading",
					"text-sky-500 shadow-copied dark:bg-sky-500/10":
						store.state === "copied",
					"shadow-sm": store.state !== "copied",
					"dark:shadow-none": store.state === "disabled",
					"dark:shadow-highlight/20":
						store.state !== "copied" && store.state !== "disabled",
				}}
				onClick={() => {
					setStore({ state: "loading" });
				}}
				disabled={
					store.state === "copied" ||
					store.state === "disabled" ||
					store.state === "loading"
				}
			>
				<span
					class="absolute inset-0 flex items-center justify-center"
					classList={{
						invisible:
							store.state === "copied" ||
							store.state === "loading",
					}}
					aria-hidden={
						store.state === "copied" || store.state === "loading"
							? "true"
							: "false"
					}
				>
					Share
				</span>
				<span
					class="absolute inset-0 flex items-center justify-center"
					classList={{
						invisible: store.state !== "loading",
					}}
					aria-hidden={store.state !== "loading" ? "true" : "false"}
				>
					<span class="sr-only">Loading</span>
					<svg
						fill="none"
						viewBox="0 0 24 24"
						class="w-4 h-4 animate-spin"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						/>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				</span>
				<span
					classList={{ invisible: store.state !== "copied" }}
					aria-hidden={store.state === "copied" ? "false" : "true"}
				>
					Copied!
				</span>
			</button>
			<Show when={store.state === "error"}>
				<p
					class="text-sm leading-5 font-medium text-gray-500 dark:text-gray-400 truncate"
					title={store.errorText}
				>
					<span class="sr-only">Error: </span>
					{store.errorText}
				</p>
			</Show>
			{(store.state === "copied" || store.state === "disabled") &&
				store.path && (
					<button
						type="button"
						class="flex-auto min-w-0 flex items-center space-x-2 text-sm leading-6 font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
						title={`http://localhost:3000/${store.path}`}
						onClick={() => {
							navigator.clipboard
								.writeText(window.location.origin + store.path)
								.then(() => {
									setStore((currentState) => ({
										...currentState,
										state: "copied",
									}));
								});
						}}
					>
						<svg
							width="26"
							height="22"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="flex-none text-gray-300 dark:text-gray-500"
							aria-hidden="true"
						>
							<path d="M14.652 12c1.885-1.844 1.75-4.548-.136-6.392l-1.275-1.225c-1.885-1.844-4.942-1.844-6.827 0a4.647 4.647 0 0 0 0 6.676l.29.274" />
							<path d="M11.348 10c-1.885 1.844-1.75 4.549.136 6.392l1.275 1.225c1.885 1.844 4.942 1.844 6.827 0a4.647 4.647 0 0 0 0-6.676l-.29-.274" />
						</svg>
						<span class="truncate">...{store.path}</span>
					</button>
				)}
		</div>
	);
}
