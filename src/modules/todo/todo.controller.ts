import { Request, Response } from "express";

interface TodoType {
	name: string;
	description: string;
}

const getTodos = async (req: Request, res: Response) => {
	try {
		const data: TodoType[] = [
			{
				name: "Завершить уроки завтра",
				description: "в 10:00",
			},
		];

		res.status(200).send({
			success: true,
			data: data,
		});
	} catch (e) {
		console.error("Error in getTodos:", e);
	}
};

export default { getTodos };
