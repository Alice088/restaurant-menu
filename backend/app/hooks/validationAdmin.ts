import { Admins } from "@prisma/client";
import { toHashPassword } from "./toHashPassword.js";

export function validationAdmin(admin: Admins | null, login: string, password: string) {
	const { hashedPassword } = toHashPassword(password, admin?.salt);

	const result = {
		login: admin?.login === login,
		password: admin?.password === hashedPassword,
		isValid: false
	};

	result.isValid = result.login && result.password; 

	return result;
}