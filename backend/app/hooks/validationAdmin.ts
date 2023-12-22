import { Admins } from "@prisma/client";
import { toHashPassword } from "./toHashPassword.js";

export function validationAdmin(admin: Admins | null, login: string, password: string) {
	const { hashedPassword } = toHashPassword(password, admin?.salt);
  
	if (admin?.password === hashedPassword && admin.login === login) {
		return true;
	} else {
		return {
			login: admin?.login === login ? true : "login is wrong!",
			password: admin?.password === hashedPassword ? true : "Password is wrong!"
		};
	}
}