import { Router } from "express";
import { AuthController } from "../Controllers/Auth";
const authRouter = Router();
const authController = new AuthController();
authRouter.post("/login", () => {});
authRouter.post("/register", authController.registerUser);

export { authRouter };
