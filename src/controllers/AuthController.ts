import { NextFunction, Response } from "express";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";
import { User } from "../entity/User";
import { Logger } from "winston";
export class AuthController {
  constructor(
    private userService: UserService,
    private logger: Logger,
  ) {}

  async register(req: RegisterUserRequest, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = req.body;

    this.logger.debug("New request to register a user", {
      firstName,
      lastName,
      email,
    });

    try {
      const savedUser = await this.userService.create({
        firstName,
        lastName,
        email,
        password,
      } as User);
      this.logger.info("userhas been registered", { id: savedUser.id });
      res.status(201).json(savedUser);
    } catch (err) {
      next(err);
      return;
    }
  }
}

// import { Response } from "express";

// import { RegisterUserRequest } from "../types";
// import { UserService } from "../services/UserService";
// import { User } from "../entity/User";

// export class AuthController {
//   // userService: UserService;
//   constructor(private userService: UserService) {
//   }
//   async register(req: RegisterUserRequest, res: Response) {
//     const { firstName, lastName, email, password } = req.body;
//     await this.userService.create({ firstName, lastName, email, password, id: 1 } as User);
//     // { id: 123 }
//     res.status(201).json();
//   }
// }
