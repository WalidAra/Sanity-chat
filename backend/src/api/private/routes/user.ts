import { userController } from "@/core/interface/controllers";
import { Router } from "express";
const router = Router();
const { getProfile, searchProfiles } = userController;

router.get("/", getProfile);
router.get("/search", searchProfiles);

export default router;
