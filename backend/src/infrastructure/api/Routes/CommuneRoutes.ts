import { Router } from "express";
import { CommuneController } from "../Controllers/CommuneController";
import { upload } from "src/fileUpload";
const CommuneRouter = Router();
const communeController = new CommuneController();

CommuneRouter.post("/create", upload.single("profileImage"), communeController.createCommune);
CommuneRouter.post("/join", communeController.joinCommune);
CommuneRouter.get("/:communeId", communeController.getCommune);
CommuneRouter.get("/:communeId/channels", communeController.getCommuneChannels);
CommuneRouter.post("/:communeId/add-channel", communeController.addCommuneChannel);
CommuneRouter.get("/:communeId/channel/:channelId", communeController.getCommuneChannel);
export { CommuneRouter };