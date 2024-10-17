import { Comment } from "@core/domain/entities/Comment";
import { Thread } from "@core/domain/entities/Thread";
import { CommentModel } from "@data/models/Comment";
import ThreadModel from "@data/models/Thread";
import { HttpError } from "@utils/ErrorHandler/HttpError";
import mongoose from "mongoose";

export class ThreadRepository {


    createThread = async (thread: Thread): Promise<Thread> => {
        try {
            const newThread = new ThreadModel(thread);
            const savedThreaad = await newThread.save();
            return new Thread(savedThreaad);
        }
        catch (err: any) {
            throw new Error("Error at ThreadRepository.createThread: " + err.message);
        }
    }

    getThreadById = async (id: string): Promise<Thread> => {
        try {
            const thread = await ThreadModel.findById(id);
            if (!thread) throw new HttpError(404, "Thread Not Found");
            return new Thread(thread);
        }
        catch (err: any) {
            throw new Error("Error at ThreadRepository.getThreadById: " + err.message);
        }
    }

    getThreads = async (): Promise<Thread[]> => {
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

            const [thread, commentCount] = await Promise.all([
                ThreadModel.findById(threadId)
                    .populate({
                        path: 'comments',
                        populate: {
                            path: 'createdBy',
                        },
                        options: {
                            skip: (pageNumber - 1) * limit,
                            limit: limit,
                            sort: { createdAt: -1 },
                        },
                    }),
                ThreadModel.aggregate([
                    { $match: { _id: new mongoose.Types.ObjectId(threadId) } },
                    { $project: { commentCount: { $size: '$comments' } } },
                ]),
            ]);
            console.log("Thread : ", thread);
            console.log("CommentCount : ", commentCount);
            console.log("Comments : ", thread?.comments);
            if (!thread) throw new HttpError(404, "Thread Not Found");

            const total = commentCount[0]?.commentCount || 0;
            const currentCount = thread?.comments?.length || 0;
            const hasMore = currentCount + skip < total;

            return {
                comments: thread?.comments,
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

    getCommentReplies = async (threadId: string, commentId: string, limit: number, pageNumber: number) => {
        try {
            console.log("CommentId : ", commentId)
            const skip = Math.max((pageNumber - 1) * limit, 0);
            const comments = await CommentModel.find({ parent: new mongoose.Types.ObjectId(commentId) })
                .limit(limit)
                .skip(skip)
                .populate("createdBy");
            console.log("comments : ", comments)
            const total = await CommentModel.countDocuments({ parent: new mongoose.Types.ObjectId(commentId) });
            console.log("skip : ", skip)
            const currentCount = comments.length;
            const hasMore = currentCount + skip < total;

            if (!comments) throw new HttpError(404, "Thread Not Found");
            return {
                comments,
                total,
                hasMore
            };
        }
        catch (err: any) {
            throw new Error("Error at ThreadRepository.getCommentReplies: " + err.message);
        }
    }
    postCommentReply = async (threadId: string, commentId: string, content: string, createdBy: string): Promise<Comment> => {
        try {
            const newComment = new CommentModel({ content, createdBy, thread: threadId, parent: commentId });
            const savedComment = await newComment.save();
            if (savedComment) {
                const x = await CommentModel.findByIdAndUpdate(commentId, {
                    $push: {
                        replies: savedComment._id
                    }
                });
                console.log("x", x)
            }
            console.log(savedComment);
            console.log(commentId);
            return new Comment(savedComment);
        } catch (err: any) {
            throw new Error("Error at ThreadRepository.postCommentReply: " + err.message);
        }
    }

}