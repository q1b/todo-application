import {
	Show,
	Component,
	createEffect,
	createResource,
	createSignal,
	For,
	on,
	Switch,
	Match,
} from "solid-js";

import {
	addTodo,
	addToLoadingArr,
	deleteTodo,
	heading,
	input,
	loadingArr,
	setCompleted,
	setHeading,
	setInput,
	setTodoGroup,
	todoGroup,
	setInCompleted,
	updateLabel,
} from "./store";

import { CheckBoxCircleIcon, LoadingIcon, TrashIcon } from "@/assets/icons";
import { useParams } from "solid-app-router";
import { API } from "@/api/api";
import { debounce } from "@solid-primitives/scheduled";
import { TodoItem } from "@/components/TodoItem";

const Shared: Component = () => {
	const [width, setWidth] = createSignal(0);
	let dimRef: HTMLElement;
	createEffect(
		on(heading, () => {
			setWidth(dimRef.offsetWidth);
			console.log("Heading Changed");
		})
	);
	const params = useParams();
	const id = params?.id;

	console.log(id);

	const [settledData, { refetch: refetch }] = createResource(
		id,
		async (id: string) =>
			await Promise.allSettled([
				API.TodoGroup.get({ id }),
				API.Todos.getAll({ group_id: id }),
			])
	);

	const updateHeadingAsync = debounce((heading: string) => {
		addToLoadingArr(
			async () =>
				await API.TodoGroup.updateLabel({
					id: todoGroup.id,
					label: heading,
				})
		);
		console.log("Sending Request");
	}, 420);

	const updateTodoLabelAsync = debounce((id: string, label: string) => {
		addToLoadingArr(
			async () =>
				await API.Todos.updateLabel({
					id,
					label,
				})
		);
		console.log("Updating the Label Backend");
	}, 540);

	createEffect(() => {
		if (!settledData.loading) {
			const [todo_group_res, todos_res] = settledData();
			if (todo_group_res.status === "fulfilled") {
				if (todo_group_res.value.data) {
					if (todo_group_res.value.data?.label) {
						setTodoGroup("id", todo_group_res.value.data.id);
						setHeading(todo_group_res.value.data.label);
					}
				} else console.log("No Heading DATA");
			}
			if (todos_res.status === "fulfilled") {
				if (todos_res.value.data)
					setTodoGroup("todos", todos_res.value.data);
			}
		}
	});

	return (
		<>
			<div class="absolute top-3 right-24">
				<Switch>
					<Match when={loadingArr.includes("error")}>
						<div class="text-xl px-2 py-1 rounded-md bg-red-400/75 dark:bg-rose-600/10 text-white">
							Failed !
						</div>
					</Match>
					<Match when={loadingArr.length !== 0}>
						<div class="relative">
							<LoadingIcon class="w-8 h-8 dark:text-white" />
							<span class="absolute top-1 left-3">
								{loadingArr.length}
							</span>
						</div>
					</Match>
				</Switch>
			</div>
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
					setHeading(
						e.currentTarget.value.trimStart().replace(/\s+/g, " ")
					);
					updateHeadingAsync(
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
					<Show
						when={!settledData.loading}
						fallback={
							<LoadingIcon class="w-18 h-18 dark:text-white text-slate-700" />
						}
					>
						<div class="mt-4 items-center flex w-full max-w-[596px] flex-col gap-y-6">
							<For each={todoGroup.todos}>
								{(todo, i) => {
									return (
										<TodoItem
											onInput={(v) => {
												updateLabel({
													todo_id: todo.id,
													value: v,
												});
												updateTodoLabelAsync(
													todo.id,
													v
												);
											}}
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
					</Show>
				</div>
			</article>
			<div class="bg-slate-50 bottom-0 fixed left-0 dark:bg-slate-800 pt-4 pr-4 pb-3 pl-3 rounded-tr-lg"></div>
		</>
	);
};

export default Shared;
