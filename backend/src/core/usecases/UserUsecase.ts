import { UserRepository } from "@data/repositories/UserRepository";
import { User } from "@core/domain/entities/User";
export class UserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.registerUser = this.registerUser.bind(this);
  }

  async registerUser(user: User) {
    const isUserExists = await this.userRepository.isUserExists(user.email);
    if (isUserExists) throw new Error("User already exists");
    return this.userRepository.createUser(user);
  }
}
