// modules/auth/routes/auth.route.ts
import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "@core/middlewares/auth.middleware";
import { validateDto } from "@core/middlewares/validate.dto";
import { LoginDto,RegisterDto } from "../auth.dto";

const router = Router();
const controller = new AuthController();

router.post("/login", validateDto(LoginDto), controller.login);
router.post("/register", validateDto(RegisterDto), controller.register);
router.get("/me", authMiddleware(true), controller.me);

export default router;
