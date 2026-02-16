import { Request, Response } from "express";
import { prisma } from "../../plugins/prisma";

const createImages = async (req: Request, res: Response) => {
	const { filePath } = req.body;
	try {
		const data = await prisma.images.create({
			data: {
				filePath: filePath,
			},
		});
		res.status(200).send({
			success: true,
			data: data,
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			message: `Error in createImages: ${e}`,
		});
	}
};

const getImages = async (req: Request, res: Response) => {
	try {
		const data = await prisma.images.findMany();
		res.status(200).send({
			success: true,
			data: data,
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			message: `Error in getImages: ${e}`,
		});
	}
};

export default { createImages, getImages };
