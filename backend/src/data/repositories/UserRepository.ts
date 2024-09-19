import { IUserRepository } from "src/core/domain/repositories/UserRepository";
import { User } from "@core/domain/entities/User";
import { UserModel } from "@data/models/User";
export class UserRepository implements IUserRepository {
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
      return new User(
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.threads,
        newUser.friends,
        newUser.communes,
        newUser.password,
        newUser._id
      );
    } catch (err: any) {
      throw new Error("Error at UserRepository.createUser: " + err.message);
    }
  }
  saveUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return null;
      return new User(
        user.firstName,
        user.lastName,
        user.email,
        user.threads,
        user.friends,
        user.communes,
        user.password,
        user._id
      );
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
  getUserById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  deleteUser(user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  getFriends(userId: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  getCommunes(userId: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  getThreads(userId: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  addFriend(userId: string, friendId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  addCommune(userId: string, communeId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  addThread(userId: string, threadId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  removeFriend(userId: string, friendId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  removeCommune(userId: string, communeId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  removeThread(userId: string, threadId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
