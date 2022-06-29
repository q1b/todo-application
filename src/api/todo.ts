import { Todo } from "./api.type";
import axiosApi from "./api";
import { AxiosPromise, AxiosResponse } from "axios";

const getAll = async (): Promise<AxiosResponse<Todo[]>> =>
	await axiosApi.get("/todos");

const get = async ({ id }: { id: string }): Promise<AxiosResponse<Todo>> =>
	await axiosApi.get(`/todos?id=${id}`);

const add = async ({ groupId, label }: { groupId: string; label: string }) => {
	return await axiosApi.post(`/todos?group_id=${groupId}`, {
		label,
	});
};

const updateLabel = async ({ id, label }: { id: string; label: string }) => {
	return await axiosApi.put(`/todos/${id}`, {
		label,
	});
};

const complete = async ({ id }: { id: string }) => {
	return await axiosApi.put(`/todos/${id}/completed`);
};

const incomplete = async ({ id }: { id: string }) => {
	return await axiosApi.put(`/todos/${id}/incompleted`);
};

const del = async ({ id }: { id: string }) => {
	return await axiosApi.delete(`/todos?id=${id}`);
};

export const Todos = {
	getAll,
	get,
	add,
	updateLabel,
	complete,
	incomplete,
	del,
};
