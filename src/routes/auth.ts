import express from "express";
import { AuthController } from "../controllers/AuthController";

const router = express.Router();

// router.post("/register", (req, res) => {
//     res.status(201).send();
// });

const authController = new AuthController();
router.post("/register", (req, res) => authController.register(req, res));
export default router;
