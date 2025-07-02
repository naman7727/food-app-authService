import { Repository } from "typeorm";
import { User } from "../entity/User";
import { UserData } from "../types";
// import { AppDataSource } from "../config/data-source";
export class UserService {
  constructor(private userRepository: Repository<User>) {}
  async create({ firstName, lastName, email, password }: UserData) {
    // const userRepository = AppDataSource.getRepository(User);
    await this.userRepository.save({ firstName, lastName, email, password });
  }
}
