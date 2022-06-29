import { TodoGroup } from "@/api/api.type";
import { batch, createEffect, createSignal, createUniqueId } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

export const [store, setStore] = createLocalStore<TodoGroup>({
	name: "todolist",
	init: {
		id: createUniqueId(),
		label: "Todo App",
		viewCount: 0,
		todos: [],
	},
});

export const [input, setInput] = createSignal("");

export const heading = () => store.label;

export const setHeading = (heading: string) => {
	setStore("label", heading);
};

export const addTodo = (e: SubmitEvent) => {
	e.preventDefault();
	batch(() => {
		setStore("todos", store.todos.length, {
			label: input(),
			done: false,
			id: createUniqueId(),
		});
		setInput("");
	});
};

export const updateLabel = ({
	todo_id,
	value,
}: {
	todo_id: string;
	value: string;
}) => {
	const indexOfObject = store.todos.findIndex((object) => {
		return object.id === todo_id;
	});
	if (indexOfObject !== -1) setStore("todos", indexOfObject, "label", value);
};

export const setCompleted = ({ id }: { id: string }) => {
	const indexOfObject = store.todos.findIndex((object) => {
		return object.id === id;
	});
	if (indexOfObject !== -1) setStore("todos", indexOfObject, "done", true);
};

export const setInCompleted = ({ id }: { id: string }) => {
	const indexOfObject = store.todos.findIndex((object) => {
		return object.id === id;
	});
	if (indexOfObject !== -1) setStore("todos", indexOfObject, "done", false);
};

export const deleteTodo = ({ id }: { id: string }) =>
	setStore("todos", (t) => removeItem(t, id));

function createLocalStore<T>({
	name,
	init,
}: {
	name: string;
	init: T;
}): [Store<T>, SetStoreFunction<T>] {
	const localStore = localStorage.getItem(name);
	const [state, setState] = createStore<T>(
		localStore ? JSON.parse(localStore) : init
	);
	createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
	return [state, setState];
}

function removeItem<T>(
	array: readonly (T & { id: string })[],
	itemId: string
): T[] {
	const indexOfObject = array.findIndex((object) => {
		return object.id === itemId;
	});
	if (indexOfObject !== -1) {
		return [
			...array.slice(0, indexOfObject),
			...array.slice(indexOfObject + 1),
		];
	}
}
