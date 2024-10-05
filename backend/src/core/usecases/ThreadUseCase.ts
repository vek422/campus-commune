import { Thread } from "@core/domain/entities/Thread";
import { ThreadRepository } from "@data/repositories/ThreadRepository";


export class ThreadUsecase {
    private threadRepository: ThreadRepository;


    constructor() {
        this.threadRepository = new ThreadRepository();
    }

    createThread = async (thread: Thread): Promise<any> => {
        return await this.threadRepository.createThread(thread);
    }
    getThread = async (threadId: string): Promise<any> => {
        return await this.threadRepository.getThreadById(threadId)
    }

    getThreads = async (): Promise<any> => {
        return await this.threadRepository.getThreads();
    }
}