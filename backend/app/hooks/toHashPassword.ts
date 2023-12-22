import crypto, { createHash } from "crypto";

export function toHashPassword(password: string, salt?: string) {
	const newSalt = salt ? salt : crypto.randomBytes(16).toString("base64");

	const hashedPassword = createHash("sha256")
		.update(password)
		.update(createHash("sha256").update(newSalt, "utf8").digest("hex"))
		.digest("hex");
	
	return {
		hashedPassword,
		newSalt
	};
}