import { ThreadUsecase } from "@core/usecases/ThreadUseCase";
import { Router } from "express";
import { ThreadController } from "../Controllers/ThreadController";

const ThreadRouter = Router();

const threadController = new ThreadController();
ThreadRouter.post("/", threadController.createThread);
ThreadRouter.get("/", threadController.getThreads);
ThreadRouter.get("/:threadId", threadController.getThread);
export { ThreadRouter }