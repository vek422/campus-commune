import { Router } from "express";
import { ThreadController } from "../Controllers/ThreadController";

import { upload } from "src/fileUpload";
const ThreadRouter = Router();

const threadController = new ThreadController();
ThreadRouter.post("/", upload.fields([{ name: "images", maxCount: 5 }]), threadController.createThread);
ThreadRouter.get("/", threadController.getThreads);
ThreadRouter.get("/:threadId", threadController.getThread);
ThreadRouter.get("/:threadId/comments", threadController.getComments);
ThreadRouter.post("/:threadId/comment", threadController.postComment);
export { ThreadRouter }