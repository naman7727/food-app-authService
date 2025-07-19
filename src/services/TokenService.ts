import fs from "fs";
import path from "path";
import createHttpError from "http-errors";
import { JwtPayload, sign } from "jsonwebtoken";
import { Config } from "../config";

export class TokenService {
  generateAccessToken(payload: JwtPayload) {
    let privateKey: Buffer;

    // path fatch the private key to the certs
    try {
      privateKey = fs.readFileSync(
        path.join(__dirname, "../../certs/private.pem"),
      );
    } catch (err) {
      const error = createHttpError(500, "Error while reading private key");
      throw error;
      console.log(err);
    }

    const accessToken = sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
      issuer: "auth-service",
    });
    return accessToken;
  }

  generateRefreshToken(payload: JwtPayload) {
    const refreshToken = sign(payload, Config.REFRESH_TOKEN_SECRET!, {
      algorithm: "HS256",
      expiresIn: "1y",
      issuer: "auth-service",
      jwtid: String(payload.id),
    });
    return refreshToken;
  }
}
