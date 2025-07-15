import createHttpError from "http-errors";
import { User } from "../entity/User";
import { Repository } from "typeorm";
import { UserData } from "../types";
import { Roles } from "../constants";

export class UserService {
  constructor(private userRepository: Repository<User>) {}
  async create({ firstName, lastName, email, password }: UserData) {
    // async create(userData: Omit<User, "id">) {
    // const user = this.userRepository.create(userData);
    try {
      return await this.userRepository.save({
        firstName,
        lastName,
        email,
        password,
        role: Roles.CUSTOMER,
      }); // Returns saved user (with ID)
    } catch {
      const error = createHttpError(
        500,
        "Failed to store the data in the database",
      );
      throw error;
    }
  }
}

// import { Repository } from "typeorm";
// import { User } from "../entity/User";
// import { UserData } from "../types";
// // import { AppDataSource } from "../config/data-source";
// export class UserService {
//   constructor(private userRepository: Repository<User>) { }
//   async create({ firstName, lastName, email, password }: UserData) {
//     // const userRepository = AppDataSource.getRepository(User);
//     await this.userRepository.save({ firstName, lastName, email, password });
//   }
// }
// user.service.ts
