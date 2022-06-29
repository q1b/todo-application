import axiosApi from "./api";

const getAll = async () => {
	return await axiosApi.get("/todo_group");
};

const get = async ({ id }: { id: string }) => {
	return await axiosApi.get(`/todo_group?id=${id}`);
};

const getTodos = async ({ id }: { id: string }) => {
	return axiosApi.get(`/todo_group?id=${id}&todos=true`);
};

const add = async ({
	label,
	todos,
}: {
	label: string;
	todos?: {
		label: string;
		done?: boolean;
	}[];
}) => {
	return await axiosApi.post("/todo_group", {
		label,
		todos,
	});
};

const updateLabel = async ({ id, label }: { id: string; label: string }) => {
	return await axiosApi.put(`/todo_group/${id}`, {
		label,
	});
};

const incView = async ({ id }: { id: string }) => {
	return await axiosApi.put(`http://localhost:3000/todo_group/${id}/views`);
};

const del = async ({ id }: { id: string }) => {
	return await axiosApi.put(`http://localhost:3000/todo_group?id=${id}`);
};

export const TodoGroup = {
	getAll,
	get,
	getTodos,
	add,
	updateLabel,
	incView,
	del,
};
