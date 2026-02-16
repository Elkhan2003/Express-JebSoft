import { Router } from "express";
import imagesController from "./images.controller";

const router = Router();

router.post("/create", imagesController.createImages);
router.get("/get-images", imagesController.getImages);

export default router;
