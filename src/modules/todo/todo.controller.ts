import { Request, Response } from "express";

interface TodoType {
	id: number;
	name: string;
	description: string;
}

const data: TodoType[] = [];

const getTodos = async (req: Request, res: Response) => {
	try {
		res.status(200).send({
			success: true,
			data: data,
		});
	} catch (e) {
		console.error("Error in getTodos:", e);
	}
};

const createTodo = async (req: Request, res: Response) => {
	const { name, description } = req.body as TodoType;
	try {
		const newData = {
			id: data.length + 1,
			name,
			description,
		};
		data.push(newData);
		res.status(201).send({
			success: true,
			data: newData,
		});
	} catch (e) {
		console.error("Error in createTodo:", e);
	}
};

const deleteTodo = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const todoIndex = data.findIndex((todo) => todo.id === +id!);
		data.splice(todoIndex, 1);
		res.status(200).send({
			success: true,
			data: todoIndex,
		});
	} catch (e) {
		console.error("Error in deleteTodo:", e);
	}
};

export default { getTodos, createTodo, deleteTodo };
