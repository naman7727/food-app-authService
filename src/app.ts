// import express from "express";
// import path from "path";
import "reflect-metadata";
import { HttpError } from "http-errors";
// import logger from "./config/logger";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import authRouter from "./routes/auth";
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Welcome to Auth service from K8s");
});

// Add this route handler to solve the error

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // logger.error(err.message);
  console.log(err);
  const statusCode = err.statusCode || err.status || 500;

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
// app.get("/", (req, res) => {
//   res.send("Welcome to Auth service from K8s");
// });
