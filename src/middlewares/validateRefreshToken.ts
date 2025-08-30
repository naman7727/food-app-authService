import { expressjwt } from "express-jwt";
import { Config } from "../config";
import { Request } from "express";
import { AuthCookie, IRefreshTokenPayload } from "../types";
// import { async } from '../../tests/utils/index';
import { AppDataSource } from "../config/data-source";
import { RefreshToken } from "../entity/RefreshToken";
// import { Jwt } from "jsonwebtoken";
import logger from "../config/logger";

export default expressjwt({
  secret: Config.REFRESH_TOKEN_SECRET!,
  algorithms: ["HS256"],
  getToken(req: Request) {
    const { refreshToken } = req.cookies as AuthCookie;
    return refreshToken;
  },
  async isRevoked(request: Request, token) {
    console.log("token:", token);
    try {
      // Your async logic here
      const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
      const refreshToken = await refreshTokenRepo.findOne({
        where: {
          id: Number((token?.payload as IRefreshTokenPayload).id),
          user: { id: Number(token?.payload.sub) },
        },
      });
      return refreshToken === null;
    } catch (error) {
      logger.error("Error while getting refresh token", {
        id: (token?.payload as IRefreshTokenPayload).id,
        sub: token?.payload.sub,
        error,
      });
      console.error("Error in isRevoked:", error);
      throw error; // Rethrow the error to be handled by express-jwt
    }
  },
});
