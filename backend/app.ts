import express from "express";
import useMenuRouter from "./app/routes/Menu.router.js";
import useAdminsRouter from "./app/routes/Admins.router.js";
import { Env } from "./configs/Env.config.js";

const app = express();
const env = new Env();
const port = env.get("PORT") || 3001;


app.use(express.json());
app.use("/menu", useMenuRouter);
app.use("/admins", useAdminsRouter);

app.listen(port, () => {
	console.log("server has been started on: ", port);
});