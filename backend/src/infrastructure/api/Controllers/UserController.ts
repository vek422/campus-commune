import { UserRepository } from "@data/repositories/UserRepository";
import { HttpError } from "@utils/ErrorHandler/HttpError";
import { Request, Response } from "express";

export class UserController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }


    getUserById = async (req: Request, res: Response) => {
        const { userId } = req.params;
        if (!userId) return res.status(405).json({ message: "Invalid request" });

        try {
            const user = await this.userRepository.getUserById(userId);
            res.status(200).json(user);
        } catch (err: any) {
            if (err instanceof HttpError) {
                return res.status(err.status).json({ message: err.message });
            }
            res.status(400).json({ message: err.message });
        }
    }
}   