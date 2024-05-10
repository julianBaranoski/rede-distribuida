import express from "express";
import FinderController from "../controllers/finder.js";

const router = express.Router();

router.get("/find", FinderController.find);

export default router;
