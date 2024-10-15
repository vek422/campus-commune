import { Commune } from "@core/domain/entities/Commune";
import { CommuneUsecase } from "@core/usecases/CommuneUsecase";
import { HttpError } from "@utils/ErrorHandler/HttpError";
import { Request, Response } from "express";

export class CommuneController {
    private communeUsecase: CommuneUsecase;

    constructor() {
        this.communeUsecase = new CommuneUsecase();
        this.createCommune = this.createCommune.bind(this);
        this.joinCommune = this.joinCommune.bind(this);
        this.getCommune = this.getCommune.bind(this)
    }

    async createCommune(req: Request, res: Response) {
        try {
            const { name, description, profileUri, createdBy } = req.body;
            //TODO add validation for the request body
            const newCommune = new Commune({ name, description, profileUri, createdBy })
            const commune = await this.communeUsecase.createCommune(newCommune);
            res.status(201).json(commune);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    async getCommune(req: Request, res: Response) {
        const { communeId } = req.params;
        if (!communeId) return res.status(405).json({ message: "Invalid request" });

        try {
            const commune = await this.communeUsecase.getCommune(communeId);
            res.status(200).json({ commune: commune });
        } catch (err: any) {
            if (err instanceof HttpError) {
                return res.status(err.status).json({ message: err.message });
            }
            res.status(400).json({ message: err.message });
        }
    }
    async joinCommune(req: Request, res: Response) {
        const { userId, communeId } = req.body;

        if (!userId || !communeId) return res.status(405).json({ message: "Invalid request" });

        try {
            const commune = await this.communeUsecase.joinCommune(communeId, userId);
            res.status(200).json(commune);
        } catch (err: any) {
            if (err instanceof HttpError) {
                return res.status(err.status).json({ message: err.message });
            }
            res.status(400).json({ message: err.message });
        }
    }

    getCommuneChannels = async (req: Request, res: Response) => {
        try {
            const { communeId } = req.params;
            if (!communeId) return res.status(400).json({ message: "Bad Request" })
            const channels = await this.communeUsecase.getCommuneChannels(communeId);
            return res.status(200).json({ channels: channels });
        } catch (err: any) {
            if (err instanceof HttpError) return res.status(err.status).json({ message: err.message })
            res.status(500).json({ message: "Something went wrong its not you its us : " + err.message })
        }
    }
    addCommuneChannel = async (req: Request, res: Response) => {
        try {
            const { communeId } = req.params;
            const { channelName } = req.body;
            if (!communeId || !channelName) return res.status(400).json({ message: "Invalid Request" });
            const savedChannel = await this.communeUsecase.addChannel(communeId, channelName);
            res.status(200).json({ channel: savedChannel });
        } catch (err: any) {
            return res.status(500).json({
                message: "Something went wrong at server : " + err.message
            })
        }
    }
    getCommuneChannel = async (req: Request, res: Response) => {
        try {
            const { communeId, channelId } = req.params;
            if (!communeId || !channelId) res.status(400).json({ message: "Invalid Request" })
            const channel = await this.communeUsecase.getChannelInfo(communeId, channelId);
            return res.status(200).json({ channel: channel });
        } catch (err: any) {
            return res.status(500).json({
                message: "Something went wrong at server : " + err.message
            })
        }
    }


}