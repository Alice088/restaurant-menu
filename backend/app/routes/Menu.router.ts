import express from "express";
import { getMenuRows, createMenuRow, updateMenuRow, removeMenuRow } from "../controllers/Menu.controller.js";
const router = express.Router();

router.post("/createRow/:category/:price/:name", createMenuRow); //c
router.get("/rows", getMenuRows); //r
router.patch("/updateRow/:id", updateMenuRow); //u
router.delete("/deleteRow/:id", removeMenuRow); //d :)

export default router;