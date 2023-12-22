import express from "express";
import { addAdmin, removeAdmin, updateAdmin, getAdmins, validAdmin } from "../controllers/Admins.controller.js";

const router = express.Router();

router.post("/createAdmin/:password/:login", addAdmin);
router.delete("/deleteAdmin/:id", removeAdmin);
router.patch("/updateAdmin/:id", updateAdmin);
router.get("/allAdmins", getAdmins);
router.post("/validAdmin/:id", validAdmin);

export default router;