import { Router } from "express";
import apiRouter from "../routes/api.router.js";
import clientController from "../controllers/client.controller.js";

const router = Router();

router.use("/api/v1", apiRouter);
router.get("/(.*)", clientController.home);

export default router;