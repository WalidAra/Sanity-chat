import { Router } from "express";
import publicRouter from "./public";
import privateRouter from "./private";
import { checkAuth } from "@/middlewares";

const router = Router();

router.use("/public", publicRouter);
router.use("/private", checkAuth, privateRouter);

export default router;
