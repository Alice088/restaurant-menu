import { config, DotenvParseOutput } from "dotenv";

export class Env {
	private config: DotenvParseOutput;

	constructor() {
		const { error, parsed } = config();
    
		if (error) {
			throw new Error(".env file not found");
		} else if (!parsed) {
			throw new Error(".env is empty");
		}
    
		this.config = parsed;
	}
  
	get(key: string): string {
		const value = this.config[key];
		if (!value) throw new Error(`.env don't has ${key}`);
		return value;
	}
}