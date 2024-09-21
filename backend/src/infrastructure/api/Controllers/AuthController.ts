import { User } from "@core/domain/entities/User";
import { UserUseCase } from "@core/usecases/UserUsecase";
import { Request, Response } from "express";
import { HttpError } from "src/utils/ErrorHandler/HttpError";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@config/index";
export class AuthController {
  private userUsecase: UserUseCase;
  constructor() {
    this.userUsecase = new UserUseCase();
    this.registerUser = this.registerUser.bind(this);
  }
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.userUsecase.login({ email, password });
      //generate JWT token
      const token = jwt.sign(
        { email: user.email, id: user.id },
        JWT_SECRET as string
      );
      res.status(200).json({ user, token }).end();
    } catch (err: any) {
      if (err instanceof HttpError) {
        res.status(err.status).json({ message: err.message }).end();
        return;
      }
      res.status(500).json({ message: err.message }).end();
    }
  };

  async registerUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        isPasswordHashed: false,
      });
      const result = await this.userUsecase.registerUser(user);
      res.status(201).json(result).end();
    } catch (err: any) {
      if (err instanceof HttpError) {
        res.status(err.status).json({ message: err.message }).end();
        return;
      }
      res.status(500).json({ message: err.message }).end();
    }
  }
}
