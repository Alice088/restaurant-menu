import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getMenuRows(req: Request, res: Response) {
	await prisma.menu.findMany()
		.then(res.send.bind(res))
		.catch(error => {
			res.send(error).status(500);
			throw error;
		});	
}

export async function createMenuRow(req: Request, res: Response) {
	try {
		const newRow = await prisma.menu.create({
			data: {
				category: req.params.category,
				price: +req.params.price,
				name: req.params.name,
			}
		});

		res.send(newRow);
	} catch (error) {
		res.send(error).status(500);
		throw error;
	}
}

export async function updateMenuRow(req: Request, res: Response) {
	try {
		const updatedRow = await prisma.menu.update({
			where: { id: +req.params.id },
			data: req.body
		});

		res.send(updatedRow);
	} catch (error) {
		res.send(error).status(500);
		throw error;
	}
}

export async function removeMenuRow(req: Request, res: Response) {
	await prisma.menu.delete({ where: { id: +req.params.id } })
		.then(res.send.bind(res))
		.catch(error => {
			res.send(error).status(500);
			throw error;
		});
}
