import { Request, Response } from "express";
import { prisma } from "../../plugins/prisma";

interface UserType {
	name: string;
	description: string;
}

const getUsers = async (req: Request, res: Response) => {
	try {
		const data = await prisma.user.findMany();
		res.status(200).send({
			success: true,
			data: data,
		});
	} catch (e) {
		console.error("Error in getUsers:", e);
	}
};

const getMe = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const data = await prisma.user.findFirst({
			where: {
				id: Number(id),
			},
		});
		res.status(200).send({
			success: true,
			data: data,
		});
	} catch (e) {
		console.error("Error in getMe:", e);
	}
};

const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email } = req.body;
		const data = await prisma.user.create({
			data: {
				name: name,
				email: email,
			},
		});
		res.status(201).send({
			success: true,
			result: data,
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			message: `Error creating user: ${e}`,
		});
	}
};

const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, email } = req.body;
	try {
		const data = await prisma.user.update({
			where: {
				id: Number(id),
			},
			data: {
				name: name,
				email: email,
			},
		});
		res.status(200).send({
			success: true,
			result: data,
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			message: `Error updateUser: ${e}`,
		});
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = await prisma.user.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(204).send({
			success: true,
			result: data,
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			message: `Error deleteUser: ${e}`,
		});
	}
};

export default { getUsers, getMe, createUser, updateUser, deleteUser };
