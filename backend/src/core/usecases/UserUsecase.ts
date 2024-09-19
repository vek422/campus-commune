import { UserRepository } from "@data/repositories/UserRepository";
import { User } from "@core/domain/entities/User";
export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async registerUser(user: User) {
    //check if user already exists
    const isUserExists = await this.userRepository.getUserByEmail(user.email);
    if (isUserExists) throw new Error("User already exists");

    // create user
    return this.userRepository.createUser(user);
  }
}
