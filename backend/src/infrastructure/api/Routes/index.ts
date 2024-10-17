import { Router } from "express";
import { authRouter } from "./AuthRoutes";
import { CommuneRouter } from "./CommuneRoutes";
import { UserRouter } from "./UserRoutes";
import { ThreadRouter } from "./ThreadRoutes";
import path from "path";
import express from "express";
const router = Router();

router.use("/static", express.static(path.join(__dirname, "../../../public/assets")));
router.use("/auth", authRouter);
router.use("/commune", CommuneRouter);
router.use("/user", UserRouter);
router.use("/thread", ThreadRouter);
export { router };
