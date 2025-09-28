import { NextFunction, Response, Request } from "express";
import { AuthRequest } from "../types";
import createHttpError from "http-errors";
// import { Roles } from '../types/roles';

export const canAccess = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const _req = req as AuthRequest;
    const roleFromToken = _req.auth.role;

    if (!roles.includes(roleFromToken)) {
      const error = createHttpError(
        403,
        "You do not have permission to access this resource",
      );
      next(error);
      return;
    }
    next();
  };
};
