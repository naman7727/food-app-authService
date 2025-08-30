import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksClint from "jwks-rsa";
import { Request } from "express";
import { Config } from "../config";
import { AuthCookie } from "../types";

export default expressjwt({
  secret: jwksClint.expressJwtSecret({
    jwksUri: Config.JWKS_URI!,
    cache: true,
    rateLimit: true,
  }) as GetVerificationKey,
  algorithms: ["RS256"],

  getToken(req: Request) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.split(" ")[1] !== "undefined") {
      const token = authHeader.split(" ")[1];
      if (token) {
        return token;
      }
    }

    const { accessToken } = req.cookies as AuthCookie;
    return accessToken;
  },
});

// import { expressjwt, GetVerificationKey } from "express-jwt";
// import jwksRsa from "jwks-rsa";
// import { Request } from "express";
// import { Config } from "../config";
// import { AuthCookie } from "../types";

// // JWT middleware
// export default expressjwt({
//   secret: jwksRsa.expressJwtSecret({
//     jwksUri: Config.JWKS_URI!, // Your JWKS endpoint
//     cache: true,
//     rateLimit: true,
//   }) as GetVerificationKey,

//   algorithms: ["RS256"],

//   getToken(req: Request) {
//     // ✅ Check Authorization Header
//     const authHeader = req.headers.authorization;
//     if (authHeader && authHeader.startsWith("Bearer ")) {
//       const token = authHeader.split(" ")[1];
//       if (token && token !== "undefined") {
//         return token;
//       }
//     }

//     // ✅ Check cookies
//     const { accessToken } = req.cookies as AuthCookie;
//     if (accessToken && accessToken !== "undefined") {
//       return accessToken;
//     }

//     // ❌ return null
//     // ✅ instead return undefined
//     return undefined;
//   },

// });
