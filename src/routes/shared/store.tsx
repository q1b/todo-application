import { API } from "@/api/api";
import { TodoGroup } from "@/api/api.type";
import { batch, createEffect, createSignal, createUniqueId } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

export const [loadingArr, setLoadingArr] = createStore([]);

export const addToLoadingArr = async (callback: () => any) => {
	const uid = createUniqueId();
	if (callback) {
		setLoadingArr(loadingArr.length, uid);
		await callback();
		const index = loadingArr.findIndex((v) => v === uid);
		setLoadingArr([
			...loadingArr.slice(0, index),
			...loadingArr.slice(index + 1),
		]);
	}
};

export const [todoGroup, setTodoGroup] = createLocalStore<TodoGroup>({
	name: "todoSharedList",
	init: {
		id: createUniqueId(),
		label: "Todo App",
		viewCount: 0,
		todos: [],
	},
});

export const [input, setInput] = createSignal("");

export const heading = () => todoGroup.label;

export const setHeading = (heading: string) => {
	setTodoGroup("label", heading);
};

export const addTodo = (e: SubmitEvent) => {
	e.preventDefault();
	batch(() => {
		setTodoGroup("todos", todoGroup.todos.length, {
			label: input(),
			done: false,
			id: createUniqueId(),
		});
		addToLoadingArr(async () =>
			API.Todos.add({
				groupId: todoGroup.id,
				label: input(),
			})
		);
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
	const indexOfObject = todoGroup.todos.findIndex((object) => {
		return object.id === todo_id;
	});
	if (indexOfObject !== -1)
		setTodoGroup("todos", indexOfObject, "label", value);
};

export const setCompleted = ({ id }: { id: string }) => {
	const indexOfObject = todoGroup.todos.findIndex((object) => {
		return object.id === id;
	});
	if (indexOfObject !== -1) {
		setTodoGroup("todos", indexOfObject, "done", true);
		addToLoadingArr(async () =>
			API.Todos.complete({
				id,
			})
		);
	}
};

export const setInCompleted = ({ id }: { id: string }) => {
	const indexOfObject = todoGroup.todos.findIndex((object) => {
		return object.id === id;
	});
	if (indexOfObject !== -1) {
		setTodoGroup("todos", indexOfObject, "done", false);
		addToLoadingArr(async () =>
			API.Todos.incomplete({
				id,
			})
		);
	}
};

export const deleteTodo = ({ id }: { id: string }) => {
	setTodoGroup("todos", (t) => removeItem(t, id));
	addToLoadingArr(async () =>
		API.Todos.del({
			id,
		})
	);
};

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