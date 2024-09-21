import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";
import { verifyToken } from "@infrastructure/middleware/AuthMiddleware";
const authRouter = Router();
const authController = new AuthController();
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.registerUser);
authRouter.get("/verify", verifyToken, (req, res) => {
  res.send("Verified");
});
export { authRouter };
