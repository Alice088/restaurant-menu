import express from "express";
import { Env } from "./configs/Env.config.js";

const app = express();
const env = new Env();
const port = env.get("PORT");

app.listen(port, () => {
	console.log("server has been started on: ", port);
});