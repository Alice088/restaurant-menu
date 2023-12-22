import express from "express";
import { addAdmin, removeAdmin, updateAdmin, getAdmins } from "../controllers/Admins.controller.js";

const router = express.Router();

router.post("/createAdmin/:password/:login", addAdmin);
router.delete("/deleteAdmin/:id", removeAdmin);
router.patch("/updateAdmin/:id", updateAdmin);
router.get("/allAdmins", getAdmins);

export default router;