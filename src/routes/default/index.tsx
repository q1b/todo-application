import { Component, createEffect, createSignal, For, on } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";

import {
	addTodo,
	deleteTodo,
	heading,
	input,
	setCompleted,
	setHeading,
	setInCompleted,
	setInput,
	store,
} from "./store";

import { unwrap } from "solid-js/store";
import { Share } from "@/components/Share";
import { TodoItem } from "@/components/TodoItem";
import { API } from "@/api/api";

const Default: Component = () => {
	const [width, setWidth] = createSignal(0);
	let dimRef: HTMLElement;
	createEffect(
		on(heading, () => {
			setWidth(dimRef.offsetWidth);
			setDirty(true);
		})
	);

	const trigger = debounce((heading: string) => console.log(heading), 500);

	const [dirty, setDirty] = createSignal(false);
	(async () => {
		const todoGroup = await API.TodoGroup.getAll();
		console.log(todoGroup?.data);
	})();
	return (
		<>
			<h2
				ref={(el) => (dimRef = el)}
				class="absolute invisible h-auto w-auto text-5xl sm:text-6xl md:text-7xl font-bold"
			>
				{heading()}
			</h2>
			<input
				type="text"
				name="heading"
				id="heading"
				onInput={(e) => {
					trigger(
						e.currentTarget.value.trimStart().replace(/\s+/g, " ")
					);
					setHeading(
						e.currentTarget.value.trimStart().replace(/\s+/g, " ")
					);
				}}
				style={{
					width: `${width()}px`,
				}}
				value={heading()}
				class="pb-1 selection:bg-slate-600/10 caret-Sea-400 focus:outline-none bg-transparent text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent"
			/>
			<article class="w-full px-6 sm:px-8 md:px-10 flex flex-col gap-y-6 place-items-center">
				<form
					class="w-full group gap-x-3 flex items-center max-w-lg justify-center"
					onSubmit={(e) => addTodo(e)}
					// use:enhance={{result:processNewTodosResult}}
				>
					<input
						type="text"
						name="task"
						aria-label="add a todo"
						placeholder="+ Add todo"
						// appearance-none ring-1 ring-slate-900/5 leading-5 sm:text-sm border border-transparent py-2 placeholder:text-slate-400 pl-12 pr-3 block w-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white dark:bg-slate-700/20 dark:ring-slate-200/20 dark:focus:ring-sky-500 dark:text-white
						class="w-full placeholder:text-indigo-300 selection:bg-indigo-800 dark:selection:bg-slate-300 dark:placeholder:text-slate-300 font-code dark:text-slate-800 text-white bg-indigo-600 dark:bg-white ring-1 border-2 border-transparent font-medium focus-within:scale-[1.01] focus-within:border-indigo-400 dark:border-sky-100 focus:focus-within:outline-none border-sky-50 shadow-md  dark:focus:focus-within:shadow-lg dark:focus:focus-within:shadow-sky-400 focus:focus-within:shadow-indigo-600 shadow-indigo-600/40 dark:shadow-white/10 text-sm sm:text-base h-7 sm:h-8 md:h-10 rounded-lg px-2 transition-all delay-100"
						value={input()}
						onChange={(e) => setInput(e.currentTarget.value)}
					/>
					{/* <button class="group">
							<AddIcon class="w-7 h-7" basic />
						</button> */}
				</form>
				<div class="mt-4 items-center flex w-full max-w-[596px] flex-col gap-y-6">
					<For each={store.todos}>
						{(todo, i) => {
							return (
								<TodoItem
                                    onCheck={() => {
                                        setCompleted({ id: todo.id });
                                    }}
                                    onUnCheck={() => {
                                        setInCompleted({ id: todo.id });
                                    }}
                                    onDelete={() => {
                                        deleteTodo({ id: todo.id });
                                    }}
                                    isChecked={todo.done}
                                    label={todo.label}
							    />								
							);
						}}
					</For>
				</div>
			</article>
			<div class="bg-slate-50 bottom-0 fixed left-0 dark:bg-slate-800 pt-4 pr-4 pb-3 pl-3 rounded-tr-lg">
				<Share
					dirty={dirty()}
					onShareStart={() => {
						console.log("Request Is Sended ");
					}}
					onShareComplete={() => {
						console.log("Request Is Completed");
					}}
					type="Default"
					initial_id=""
					body={{
						label: heading(),
						todos: unwrap(store.todos).map((todo) => ({
							label: todo.label,
							done: todo.done,
						})),
					}}
				/>
			</div>
		</>
	);
};

export default Default;
