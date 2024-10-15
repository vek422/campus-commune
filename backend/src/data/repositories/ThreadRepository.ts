import { Comment } from "@core/domain/entities/Comment";
import { Thread } from "@core/domain/entities/Thread";
import { CommentModel } from "@data/models/Comment";
import ThreadModel from "@data/models/Thread";
import { HttpError } from "@utils/ErrorHandler/HttpError";

export class ThreadRepository {


    createThread = async (thread: Thread) => {
        try {
            const newThread = new ThreadModel(thread);
            const savedThreaad = await newThread.save();
            return savedThreaad;
        }
        catch (err: any) {
            throw new Error("Error at ThreadRepository.createThread: " + err.message);
        }
    }

    getThreadById = async (id: string) => {
        try {
            const thread = await ThreadModel.findById(id);
            if (!thread) throw new HttpError(404, "Thread Not Found");
            return thread;
        }
        catch (err: any) {
            throw new Error("Error at ThreadRepository.getThreadById: " + err.message);
        }
    }

    getThreads = async () => {
        try {
            const threads = await ThreadModel.find().limit(10);
            return threads;
        }
        catch (err: any) {
            throw new Error("Error at ThreadRepository.getThreads: " + err.message);
        }
    }

    getComments = async (threadId: string, limit: number, pageNumber: number) => {
        try {
            const skip = Math.max((pageNumber - 1) * limit, 0);
            console.log("skip : ", skip)
            const comments = await CommentModel.find({ thread: threadId }).limit(limit).skip(skip).populate("createdBy");
            const total = await CommentModel.countDocuments({ thread: threadId });
            const currentCount = comments.length;
            console.log("currentCount : ", currentCount)
            console.log("total : ", total)
            const hasMore = currentCount + skip < total;

            if (!comments) throw new HttpError(404, "Thread Not Found");
            return {
                comments,
                total,
                hasMore
            };
        }
        catch (err: any) {
            throw new Error("Error at ThreadRepository.getThreadComments: " + err.message);
        }
    }

    postThreadComment = async (threadId: string, content: string, createdBy: string): Promise<Comment> => {
        try {
            const newComment = new CommentModel({ content, createdBy, thread: threadId });
            const savedComment = await newComment.save();
            if (savedComment) {
                await ThreadModel.findByIdAndUpdate(threadId, {
                    $push: {
                        comments: savedComment._id
                    }
                });
            }
            const { content: savedContent, imagesUri, likedBy, thread, videosUri, createdBy: savedCreatedBy, _id, createdAt } = savedComment;
            console.log(savedComment)
            return new Comment({
                content: savedContent, imagesUri,
                likedBy, thread, videosUri, createdBy: savedCreatedBy, _id, createdAt
            });
        } catch (err: any) {
            console.log(err)
            throw new Error("Error at ThreadRepository.postThreadComment: " + err.message);
        }
    }


}