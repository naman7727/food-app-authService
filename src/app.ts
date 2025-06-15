// import express from "express";
import { HttpError } from "http-errors";
import logger from "./config/logger";
import express, { NextFunction, Request, Response } from "express";
// import createHttpError, { HttpError } from "http-errors";
const app = express();

app.get("/", (req, res) => {
  // const err = createHttpError(401, "You can not access this route")
  // next(err)
  res.send("welcome naman");
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    errors: [
      {
        type: err.name,
        msg: err.message,
        path: "",
        location: "",
      },
    ],
  });
});
export default app;
