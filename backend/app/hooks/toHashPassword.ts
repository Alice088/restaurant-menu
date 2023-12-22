import crypto, { createHash } from "crypto";

export function toHashPassword(password: string) {
	const salt = crypto.randomBytes(16).toString("base64");

	return createHash("sha256")
		.update(password)
		.update(createHash("sha256").update(salt, "utf8").digest("hex"))
		.digest("hex");
}