import { User } from "../entities/User";
export interface IUserRepository {
  saveUser(user: User): Promise<User>;
  isUserExists(email: string): Promise<boolean | undefined>;
  createUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  deleteUser(user: User): Promise<boolean>;
  getUsers(): Promise<User[]>;
  getFriends(userId: string): Promise<User[]>;
  getCommunes(userId: string): Promise<User[]>;
  getThreads(userId: string): Promise<User[]>;
  addFriend(userId: string, friendId: string): Promise<boolean>;
  addCommune(userId: string, communeId: string): Promise<boolean>;
  addThread(userId: string, threadId: string): Promise<boolean>;
  removeFriend(userId: string, friendId: string): Promise<boolean>;
  removeCommune(userId: string, communeId: string): Promise<boolean>;
  removeThread(userId: string, threadId: string): Promise<boolean>;
}
