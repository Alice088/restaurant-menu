import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { toHashPassword } from "../hooks/toHashPassword.js";

const prisma = new PrismaClient();

export async function addAdmin(req: Request, res: Response) {
	try {
		const newAdmin = await prisma.admins.create({
			data: {
				login: req.params.login,
				password: toHashPassword(req.params.password)
			}
		});

		res.send(newAdmin);
	} catch (error) {
		res.send(error).status(500);
		throw 500;
	}
}

export async function removeAdmin(req: Request, res: Response) {
	await prisma.admins.delete({ where: { id: +req.params.id } })
		.then(res.send.bind(res))
		.catch(error => {
			res.send(error).status(500);
			throw 500;
		});
}

export async function updateAdmin(req: Request, res: Response) {
	for (const [key, value] of Object.entries(req.body)) {
		if (key === "password") {
			req.body[key] = toHashPassword(value as string);
		}
	}

	try {
		const updatedAdmin = await prisma.admins.update({
			where: {
				id: +req.params.id
			},

			data: req.body
		});

		res.send(updatedAdmin);
	} catch (error) {
		res.send(error).status(500);
		throw 500;
	}
}

export async function getAdmins(req: Request, res: Response) {
	await prisma.admins.findMany()
		.then(res.send.bind(res))
		.catch(error => {
			res.send(error).status(500);
			throw 500;
		});
}