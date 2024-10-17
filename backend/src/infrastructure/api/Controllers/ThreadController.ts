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

    postComment = async (req: Request, res: Response) => {
        try {
            const { threadId } = req.params;
            const { content, createdBy } = req.body;
            console.log(content, threadId, createdBy);
            const savedComment = await this.threadUseCases.postComment(threadId, content, createdBy);
            if (savedComment) {
                res.status(201).json({ comment: savedComment }).end();
            }
        } catch (err: any) {
            console.log(err)
            if (err instanceof HttpError) {
                return res.status(err.status).json({ message: err.message })
            }
            return res.status(500).json({ message: err.message })

        }
    }
    getComments = async (req: Request, res: Response) => {
        try {
            const { threadId } = req.params;
            const { limit, page } = req.query;
            console.log(limit, page)
            const { comments, total, hasMore } = await this.threadUseCases.getComments(threadId, Number(limit), Number(page));
            return res.status(200).json({ comments, total, hasMore, page });

        } catch (err: any) {
            console.log(err)
            if (err instanceof HttpError) {
                return res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        }
    }
    postCommentReply = async (req: Request, res: Response) => {
        try {
            const { threadId, commentId } = req.params;
            const { content, createdBy } = req.body;
            const savedComment = await this.threadUseCases.postCommentReply(threadId, commentId, content, createdBy);
            if (savedComment) {
                res.status(201).json({ comment: savedComment }).end();
            }
        } catch (err: any) {
            console.log(err)
            if (err instanceof HttpError) {
                return res.status(err.status).json({ message: err.message })
            }
            return res.status(500).json({ message: err.message })
        }
    }
    getCommentReplies = async (req: Request, res: Response) => {
        try {
            const { threadId, commentId } = req.params;
            console.log("commentId from controller: ", commentId)
            const { limit, page } = req.query;
            const { comments, total, hasMore } = await this.threadUseCases.getCommentReplies(threadId, commentId, Number(limit), Number(page));
            return res.status(200).json({ comments, total, hasMore, page });
        } catch (err: any) {
            console.log(err)
            if (err instanceof HttpError) {
                return res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        }
    }
}