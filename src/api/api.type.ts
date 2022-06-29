export interface TodoGroup {
	id: string;
	label: string;
	viewCount: number;
	todos: Todo[];
}

export interface Todo {
	id: string;
	createdAt: string;
	updatedAt: string;
	label: string;
	done: boolean;
	groupId: string;
}
