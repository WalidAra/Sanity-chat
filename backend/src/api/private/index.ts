import { Router } from "express";
const router = Router();

import chatRoutes from "./routes/chat";
import userRoutes from "./routes/user";
import encryptRoutes from "./routes/encrypt";

router.use("/chat", chatRoutes);
router.use("/user", userRoutes);
router.use("/encrypt", encryptRoutes);

export default router;
