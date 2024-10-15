import { Router } from "express";
import { ThreadController } from "../Controllers/ThreadController";
// import { upload } from "src/fileUpload";
import multer from "multer";
import path from "path";
import fs from "fs";
import { upload } from "src/fileUpload";
const ThreadRouter = Router();

const threadController = new ThreadController();
ThreadRouter.post("/", upload.fields([{ name: "images", maxCount: 5 }]), threadController.createThread);
ThreadRouter.get("/", threadController.getThreads);
ThreadRouter.get("/:threadId", threadController.getThread);
export { ThreadRouter }