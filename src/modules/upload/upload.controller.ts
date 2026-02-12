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
		const filePath = `uploads/${uuid4()}-${fileName}`;

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
			url: signedData.signedUrl,
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

			const { data, error } = await supabase.storage
				.from("avatar")
				.upload(`uploads/${fileName}`, file.buffer);

			if (error) {
				res.status(500).send({
					message: `Error uploading files: ${error}`,
				});
				return;
			}

			return {
				name: fileName,
				url: `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`,
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

export default { uploadFile, uploadMultipleFiles };
