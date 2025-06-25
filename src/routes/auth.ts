import express from "express";
import { AuthController } from "../controllers/AuthControlle";
const routes = express.Router();
const authController = new AuthController();
routes.post("/register", (req, res) => authController.register(req, res));
export default routes;
