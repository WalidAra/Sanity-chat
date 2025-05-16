import { authController } from "@/core/interface/controllers";
import { Router } from "express";
const router = Router();

const { signIn, signUp } = authController;

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);

export default router;
