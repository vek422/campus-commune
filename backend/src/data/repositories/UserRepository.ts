import { User } from "@core/domain/entities/User";
import { UserModel } from "@data/models/User";
import { HttpError } from "src/utils/ErrorHandler/HttpError";
export class UserRepository {
  async createUser(user: User): Promise<User> {
    try {
      const newUser = new UserModel({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        threads: user.threads,
        friends: user.friends,
        communes: user.communes,
        password: user.password,
      });
      await newUser.save();
      return new User(newUser.toObject({ versionKey: false, transform: true }));
    } catch (err: any) {
      throw new Error("Error at UserRepository.createUser: " + err.message);
    }
  }
  saveUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw new HttpError(404, "User Not Found");
      return new User(user);
    } catch (err: any) {
      throw new Error("Error at UserRepository.getUserByEmail: " + err.message);
    }
  }
  async isUserExists(email: string): Promise<boolean | undefined> {
    try {
      const user = await UserModel.exists({ email });
      return user ? true : false;
    } catch (err: any) {
      throw new Error("Error at UserRepository.isUserExists: " + err.message);
    }
  }
}
