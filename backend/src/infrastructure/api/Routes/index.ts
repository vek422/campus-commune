import { Router } from "express";
import { authRouter } from "./AuthRoutes";
const router = Router();
router.use("/auth", authRouter);
export { router };
