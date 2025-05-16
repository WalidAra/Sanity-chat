import { Router } from "express";
const router = Router();

import chatRoutes from "./routes/chat";
import userRoutes from "./routes/user";

router.use("/chat", chatRoutes);
router.use("/user", userRoutes);

export default router;
