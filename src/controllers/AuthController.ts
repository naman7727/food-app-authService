import fs from "fs";
import path from "path";
import { NextFunction, Response } from "express";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";
import { JwtPayload, sign } from "jsonwebtoken";
import { User } from "../entity/User";
import { Logger } from "winston";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Config } from "../config";

export class AuthController {
  constructor(
    private userService: UserService,
    private logger: Logger,
  ) {}

  //code for test register the customer
  async register(req: RegisterUserRequest, res: Response, next: NextFunction) {
    // Validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { firstName, lastName, email, password } = req.body;
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

      let privateKey: Buffer;

      // path fatch the private key to the certs
      try {
        privateKey = fs.readFileSync(
          path.join(__dirname, "../../certs/private.pem"),
        );
      } catch (err) {
        const error = createHttpError(500, "Error while reading private key");
        next(error);
        return;
        console.log(err);
      }

      const payload: JwtPayload = {
        sub: String(savedUser.id),
        role: savedUser.role,
      };

      // token generate
      const accessToken = sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "1h",
        issuer: "auth-service",
      });

      // refreshToken generate and create key and fatch path by certs
      const refreshToken = sign(payload, Config.REFRESH_TOKEN_SECRET!, {
        algorithm: "HS256",
        expiresIn: "1y",
        issuer: "auth-service",
      });

      res.cookie("accessToken", accessToken, {
        domain: "localhost",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60, // 1h
        httpOnly: true, //vary imp.
      });
      res.cookie("refreshToken", refreshToken, {
        domain: "localhost",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
        httpOnly: true, //vary imp.
      });
      res.status(201).json({ id: savedUser.id });
    } catch (err) {
      next(err);
      return;
    }
  }
}
