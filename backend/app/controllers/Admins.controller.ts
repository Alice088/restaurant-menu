import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { toHashPassword } from "../hooks/toHashPassword.js";
import { validationAdmin } from "../hooks/validationAdmin.js";

const prisma = new PrismaClient();

export async function addAdmin(req: Request, res: Response) {
	try {
		const { hashedPassword, newSalt } = toHashPassword(req.params.password);

		const newAdmin = await prisma.admins.create({
			data: {
				login: req.params.login,
				password: hashedPassword,
				salt: newSalt
			}
		});

		res.send(newAdmin);
	} catch (error) {
		res.send(error).status(500);
		throw error;
	}
}

export async function removeAdmin(req: Request, res: Response) {
	await prisma.admins.delete({ where: { id: +req.params.id } })
		.then(res.send.bind(res))
		.catch(error => {
			res.send(error).status(500);
			throw error;
		});
}

export async function updateAdmin(req: Request, res: Response) {
	for (const [key, value] of Object.entries(req.body)) {
		if (key === "password") {
			const { hashedPassword, newSalt } = toHashPassword(value as string);
			req.body[key] = hashedPassword;
			req.body.salt = newSalt;
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
		throw error;
	}
}

export async function getAdmins(req: Request, res: Response) {
	await prisma.admins.findMany()
		.then(res.send.bind(res))
		.catch(error => {
			res.send(error).status(500);
			throw error;
		});
}

export async function validAdmin(req: Request, res: Response) {
	prisma.admins.findFirst({ where: { login: req.params.login } })
		.then(admin => {
			res.send({
				valitedData: validationAdmin(admin, req.params.login, req.body.password),
				id: admin?.id,
			});
		})
		.catch(error => {
			res.send(error).status(500);
			throw error;
		});
}