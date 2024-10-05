import { Thread } from "@core/domain/entities/Thread";
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


}