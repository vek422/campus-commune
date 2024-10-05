import { Router } from "express";
import { UserController } from "../Controllers/UserController";
const UserRouter = Router();

const userController = new UserController();

UserRouter.get("/:userId", userController.getUserById);

export { UserRouter }