import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const serviceAccount = JSON.parse(
	fs
		.readFileSync(
			path.join(
				process.cwd(),
				"jebsoft-firebase-adminsdk-fbsvc-74c337fc91.json",
			),
		)
		.toString(),
);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export default admin;
