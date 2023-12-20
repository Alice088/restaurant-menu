import { PrismaClient } from "@prisma/client";
import type { Menu } from "@prisma/client";

const prisma = new PrismaClient();

export async function getMenuRows() {
	return await prisma.menu.findMany().catch(error => { throw error; });
}

export async function createMenuRow(data: Omit<Menu, "id">) {
	return await prisma.menu.create({
		data: data
	}).catch(error => {
		throw error;
	});
}

export async function updateMenuRow(id: number, data: Partial<Omit<Menu, "id">>) {
	return await prisma.menu.update({
		where: { id: id },
		data: data
	}).catch(error => {
		throw error;
	});
}

export async function removeMenuRow(id: number) {
	return await prisma.menu.delete({
		where: { id: id },
	}).catch(error => {
		throw error;
	});
}
