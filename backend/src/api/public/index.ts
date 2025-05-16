import { Router } from "express";
const router = Router();
import authRoutes from "./routes/auth.api";

router.use("/auth", authRoutes);

export default router;
