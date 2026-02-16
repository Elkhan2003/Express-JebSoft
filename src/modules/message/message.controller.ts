import { Request, Response } from "express";
import { prisma } from "../../plugins/prisma";

const getMessages = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		const data = await prisma.message.findMany({
			where: {
				userId: Number(userId),
			},
		});

		res.status(200).send({
			success: true,
			data: data,
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			message: `Error in getMessages: ${e}`,
		});
	}
};

const sendMessage = async (req: Request, res: Response) => {
	try {
		const { userId, message } = req.body;

		const data = await prisma.message.create({
			data: {
				userId: Number(userId),
				message: message,
			},
		});

		res.status(201).send({
			success: true,
			result: data,
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			message: `Error in sendMessage: ${e}`,
		});
	}
};

export default { getMessages, sendMessage };
