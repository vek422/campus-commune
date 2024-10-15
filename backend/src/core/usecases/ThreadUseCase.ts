import { Comment } from "@core/domain/entities/Comment";
import { Thread } from "@core/domain/entities/Thread";
import { ChannelModel } from "@data/models/channel";
import { UserModel } from "@data/models/User";
import { ThreadRepository } from "@data/repositories/ThreadRepository";
import { UserRepository } from "@data/repositories/UserRepository";
import { HttpError } from "@utils/ErrorHandler/HttpError";


export class ThreadUsecase {
    private threadRepository: ThreadRepository;
    private userRepository: UserRepository;

    constructor() {
        this.threadRepository = new ThreadRepository();
        this.userRepository = new UserRepository();
    }

    createThread = async (thread: Thread): Promise<Thread> => {
        //create a new thread
        const savedThread = await this.threadRepository.createThread(thread);
        if (!savedThread) throw new HttpError(500, "Error creating thread");
        //add the thread id in the user's thread list
        await UserModel.findByIdAndUpdate(thread.createdBy, { $push: { threads: savedThread._id } });
        //add thread in the channel's thread list
        await ChannelModel.findByIdAndUpdate(thread.channelId, { $push: { threads: savedThread._id } });
        return savedThread;

    }
    getThread = async (threadId: string): Promise<any> => {
        return await this.threadRepository.getThreadById(threadId)
    }

    getThreads = async (): Promise<any> => {
        return await this.threadRepository.getThreads();
    }
    getComments = async (threadId: string, limit: number, pageNumber: number): Promise<any> => {
        const { comments, total, hasMore } = await this.threadRepository.getComments(threadId, limit, pageNumber);
        return {
            comments,
            total,
            hasMore
        }
    }


    postComment = async (threadId: string, content: string, createdBy: string): Promise<Comment> => {
        let savedComment = await this.threadRepository.postThreadComment(threadId, content, createdBy);
        const user = await this.userRepository.addCommentToUser(createdBy, savedComment._id as string);
        savedComment.createdBy = user;
        console.log(user)
        console.log(savedComment.createdBy)
        if (!savedComment) throw new HttpError(500, "Error posting comment");
        return savedComment;
    }
}