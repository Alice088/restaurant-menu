import { defineStore } from "pinia";
import axios from "axios";

export type User = {
  id: number,
  login: string | null,
}

export const useUserStore = defineStore("User", {
	state: () => ({
		user: { id: 0, login: null } as User,
	}), 
  
	actions: {
		async validAdmin(password: string, login: string) {
			try {
				const { data } = await axios.get(`/admins/validAdmin/${login}`, {
					data: {
						password: password
					}
				});
        
				if (data.valitedData.isValid) {
					this.user.id = data.id;
					this.user.login = login;
				} else {
					return data.valitedData;
				}
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
	}
});