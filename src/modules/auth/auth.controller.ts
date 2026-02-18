import { Request, Response } from "express";
import { prisma } from "../../plugins/prisma";
import admin from "../../plugins/firebase";

const googleLogin = async (req: Request, res: Response) => {
	const { idToken } = req.body;

	try {
		const decodeToken = await admin.auth().verifyIdToken(idToken);

		const email = decodeToken.email!;

		const user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});

		if (!user) {
			res.status(404).send({
				success: false,
				message: "Пользователь не найден, Пройдите регистрацию!",
			});
			return;
		}

		res.status(200).send({
			success: true,
			message: "Успешный вход через Google",
			data: {
				id: user?.id,
				name: user?.name,
				email: user?.email,
			},
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			message: `Error in googleLogin: ${e}`,
		});
	}
};

const googleRegistration = async (req: Request, res: Response) => {
	const { idToken } = req.body;

	try {
		const decodeToken = await admin.auth().verifyIdToken(idToken);

		const email = decodeToken.email!;
		const name = decodeToken.name || null;

		const existingUser = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});

		if (existingUser) {
			res.status(409).send({
				success: false,
				message: "Пользователь с таким email уже существует",
			});
			return;
		}

		const user = await prisma.user.create({
			data: {
				email: email,
				name: name,
			},
		});

		res.status(201).send({
			success: true,
			message: "Пользователь успешно зарегистрирован через Google",
			data: {
				id: user?.id,
				name: user?.name,
				email: user?.email,
			},
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			message: `Error in googleLogin: ${e}`,
		});
	}
};

export default { googleLogin, googleRegistration };
