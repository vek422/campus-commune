import { User } from "@core/domain/entities/User";
import { UserUseCase } from "@core/usecases/UserUsecase";
import { Request, Response } from "express";

export class AuthController {
  private userUsecase: UserUseCase;
  constructor() {
    console.log("executed auth controller");
    this.userUsecase = new UserUseCase();
    this.registerUser = this.registerUser.bind(this);
  }

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
      res.status(500).json({ message: err.message }).end();
    }
  }
}
