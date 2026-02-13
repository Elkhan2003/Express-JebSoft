import { Request, Response } from "express";
import { supabase } from "../../plugins/supabase";
import uuid4 from "uuid4";

const uploadFile = async (req: Request, res: Response) => {
	try {
		if (!req.file) {
			return res.status(400).send({
				message: "No file uploaded",
			});
		}

		const fileName = req.file.originalname;
		const filePath = `${uuid4()}-${fileName}`;

		// загружаем файл в базу данных
		const { data, error } = await supabase.storage
			.from("avatar")
			.upload(filePath, req.file.buffer);

		if (error) {
			return res.status(500).send({
				message: `Error uploading file: ${error.message}`,
			});
		}

		// создаем signed URL c привязкой токена (срок годности ссылки)
		const { data: signedData, error: signedError } = await supabase.storage
			.from("avatar")
			.createSignedUrl(filePath, 60 * 60); // 1 час

		if (signedError) {
			return res.status(500).send({
				message: `Error creating signed url: ${signedError.message}`,
			});
		}

		res.status(200).send({
			name: fileName,
			filePath: filePath,
			urlImage: signedData.signedUrl,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error in uploadFile: ${error}`,
		});
	}
};

const uploadMultipleFiles = async (req: Request, res: Response) => {
	try {
		if (!req.files || !Array.isArray(req.files)) {
			return res.status(400).send({
				message: "No files uploaded",
			});
		}

		const uploadPromises = req.files.map(async (file) => {
			const fileName = file.originalname;
			const filePath = `${uuid4()}-${fileName}`;

			const { data, error } = await supabase.storage
				.from("avatar")
				.upload(filePath, file.buffer);

			if (error) {
				res.status(500).send({
					message: `Error uploading files: ${error}`,
				});
				return;
			}

			// создаем signed URL c привязкой токена (срок годности ссылки)
			const { data: signedData, error: signedError } = await supabase.storage
				.from("avatar")
				.createSignedUrl(filePath, 60 * 60); // 1 час

			if (signedError) {
				return res.status(500).send({
					message: `Error creating signed url: ${signedError.message}`,
				});
			}

			return {
				name: fileName,
				filePath: filePath,
				urlImage: signedData.signedUrl,
			};
		});

		const uploadedFiles = await Promise.all(uploadPromises);

		res.status(200).send(uploadedFiles);
	} catch (error) {
		res.status(500).send({
			message: `Error in uploadMultipleFiles: ${error}`,
		});
	}
};

const getFIleSupabase = async (req: Request, res: Response) => {
	const filePath = String(req.params.filePath);

	try {
		const { data: signedData, error: signedError } = await supabase.storage
			.from("avatar")
			.createSignedUrl(filePath, 60 * 60); // 1 час

		if (signedError) {
			return res.status(500).send({
				message: `Error creating signed url: ${signedError.message}`,
			});
		}

		res.status(200).send({
			urlImage: signedData.signedUrl,
		});
	} catch (error) {
		res.status(500).send({
			message: `Error in getFIleSupabase: ${error}`,
		});
	}
};

export default { uploadFile, uploadMultipleFiles, getFIleSupabase };
