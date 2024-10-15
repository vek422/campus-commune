import { Thread } from "@core/domain/entities/Thread";
import { ThreadUsecase } from "@core/usecases/ThreadUseCase"
import { HttpError } from "@utils/ErrorHandler/HttpError";
import { Request, Response } from "express";

export class ThreadController {
    private threadUseCases: ThreadUsecase;
    constructor() {
        this.threadUseCases = new ThreadUsecase();
    }

    createThread = async (req: Request, res: Response) => {
        const { title, content, createdBy, imagesUri, videoUri, images, channelId } = req.body;
        try {
            const result = await this.threadUseCases.createThread(new Thread({ title, content, createdBy, imagesUri, videoUri, channelId }));
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ message: error.message })
            }
            res.status(400).json(error);
        }
    }

    getThread = async (req: Request, res: Response) => {
        const { threadId } = req.params;
        if (!threadId) return res.status(405).json({ message: "Invalid request" });
        try {
            const thread = await this.threadUseCases.getThread(threadId);
            res.status(200).json(thread);
        } catch (err: any) {
            if (err instanceof HttpError) {
                return res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        }
    }
    getThreads = async (req: Request, res: Response) => {
        try {
            const threads = await this.threadUseCases.getThreads();
            res.status(200).json(threads);
        } catch (err: any) {
            if (err instanceof HttpError) {
                return res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        }
    }
}