import { UserRepository } from "@data/repositories/UserRepository";
import { User } from "@core/domain/entities/User";
import { HttpError } from "src/utils/ErrorHandler/HttpError";
import bcrypt from "bcrypt";
export class UserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.registerUser = this.registerUser.bind(this);
  }
  async getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }
  async registerUser(user: User) {
    const isUserExists = await this.userRepository.isUserExists(user.email);
    if (isUserExists) throw new HttpError(409, "User already exists");
    return this.userRepository.createUser(user);
  }
  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.getUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new HttpError(401, "Invalid password");
    return user;
  }
}
