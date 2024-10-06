import { Router } from "express";
import { CommuneController } from "../Controllers/CommuneController";
import multer from "multer";
import { upload } from "src/fileUpload";
const CommuneRouter = Router();
const communeController = new CommuneController();

CommuneRouter.post("/create", upload.single("profileImage"), communeController.createCommune);
CommuneRouter.post("/join", communeController.joinCommune);
CommuneRouter.get("/:communeId", communeController.getCommune);
export { CommuneRouter }