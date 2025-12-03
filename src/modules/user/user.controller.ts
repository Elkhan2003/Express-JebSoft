import { Request, Response } from "express";

interface UserType {
	name: string;
	description: string;
}

const getUsers = async (req: Request, res: Response) => {
	try {
		const data: UserType[] = [
			{
				name: "Санжар",
				description: "Он мой друг",
			},
		];

		res.status(200).send({
			success: true,
			data: data,
		});
	} catch (e) {
		console.error("Error in getUsers:", e);
	}
};

export default { getUsers };
