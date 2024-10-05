import { Router } from "express";
import { CommuneController } from "../Controllers/CommuneController";

const CommuneRouter = Router();
const communeController = new CommuneController();
CommuneRouter.post("/create", communeController.createCommune);
CommuneRouter.post("/join", communeController.joinCommune);
CommuneRouter.get("/:communeId", communeController.getCommune);
export { CommuneRouter }