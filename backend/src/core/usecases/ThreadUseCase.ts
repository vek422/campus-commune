import { Thread } from "@core/domain/entities/Thread";
import { ChannelModel } from "@data/models/channel";
import { UserModel } from "@data/models/User";
import { ThreadRepository } from "@data/repositories/ThreadRepository";
import { HttpError } from "@utils/ErrorHandler/HttpError";


export class ThreadUsecase {
    private threadRepository: ThreadRepository;


    constructor() {
        this.threadRepository = new ThreadRepository();
    }

    createThread = async (thread: Thread): Promise<any> => {
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
}