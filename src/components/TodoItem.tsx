import {
	FluentUnCheckedBoxIcon,
	FluentCheckBoxIcon,
	TrashIcon,
} from "@/assets/icons";
import { children, createSignal, FlowProps, Show } from "solid-js";

export const TodoItem = (props: {
	label: string;
	onCheck: () => void;
	onInput: (value: string) => void;
	isChecked: boolean;
	onUnCheck: () => void;
	onDelete: () => void;
}) => {
	console.log(props.label, props.isChecked);
	return (
		<div class="flex items-center gap-x-2 w-full">
			<Show
				when={props.isChecked}
				fallback={
					<button
						onClick={() => {
							if (props.onCheck) props.onCheck();
						}}
						class="group rounded-md"
					>
						<FluentUnCheckedBoxIcon
							class="w-7 h-7 dark:text-white group-focus-visible:text-slate-400 group-hover:text-slate-400"
							basic
						/>
					</button>
				}
			>
				<button
					onClick={() => {
						if (props.onUnCheck) props.onUnCheck();
					}}
					class="group rounded-md"
				>
					<FluentCheckBoxIcon
						class="w-7 h-7 dark:text-white group-focus-visible:text-green-400 group-hover:text-green-400"
						basic
					/>
				</button>
			</Show>
			<input
				type="text"
				name="todoItem"
				id="todoItem"
				classList={{
					"bg-gray-200 text-slate-900 focus-visible:text-white focus-visible:bg-black dark:focus-visible:text-black dark:focus-visible:bg-white":
						!props.isChecked,
					"bg-green-400 text-teal-900 focus-visible:text-green-200 focus-visible:bg-teal-700":
						props.isChecked,
				}}
				class="transition-color group flex font-semibold flex-wrap items-center w-full rounded-lg px-2 py-1.5 focus:outline-none"
				value={props.label}
				onInput={(e) =>
					props.onInput ? props.onInput(e.currentTarget.value) : null
				}
				onFocus={(e) => {
					e.preventDefault();
					e.currentTarget.selectionStart =
						e.currentTarget.value.length;
					e.currentTarget.selectionEnd = e.currentTarget.value.length;
				}}
			/>
			{/* <button
				classList={{
					"bg-gray-200 text-slate-900": !props.isChecked,
					"bg-green-400 text-teal-900": props.isChecked,
				}}
				class="transition-color group flex font-semibold flex-wrap items-center w-full rounded-lg px-2 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 dark:focus-visible:ring-2 dark:focus-visible:ring-green-200"
				onClick={() => {
					console.log(clicks());
					setClicks((c) => c + 1);
					setTimeout(() => {
						setClicks(0);
					}, 300);
					if (clicks() === 2) {
						console.log("Running");
					}
				}}
			>
				{props.label}
			</button> */}
			<button
				onClick={() => {
					if (props.onDelete) props.onDelete();
				}}
				class="group rounded-md"
			>
				<TrashIcon
					class="w-7 h-7 dark:text-white group-focus-visible:text-rose-400 group-hover:text-rose-400"
					basic
				/>
			</button>
		</div>
	);
};
