import { NextFunction, Response } from "express";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";
import { User } from "../entity/User";
import { Logger } from "winston";
import { validationResult } from "express-validator";

export class AuthController {
  constructor(
    private userService: UserService,
    private logger: Logger,
  ) {}

  async register(req: RegisterUserRequest, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = req.body;

    // Validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({ errors: result.array() });
    }
    this.logger.debug("New request to register a user", {
      firstName,
      lastName,
      email,
      password: "******",
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
