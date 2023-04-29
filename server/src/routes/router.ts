import { Router } from "express";
import apiRouter from "../routes/api.router.js";
import clientController from "../controllers/client.controller.js";

const router = Router();

router.use("/api/v1", apiRouter);
router.all("/(.*)", (req, res) => {
  if (req.method === "GET")
    return clientController.home(req, res);

  res.status(404).json(null);
});

export default router;