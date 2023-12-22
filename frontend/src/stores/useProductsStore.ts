import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

export type Product = {
	id: number,
	category: string,
	price: number,
	name: string
}

export const useProductsStore = defineStore("products", {
	state: () => ({
		products: [] as Product[],
		fetching: false
	}),

	actions: {
		async getProducts() {
			this.fetching = true;

			const { data: products } = await axios.get("/menu/rows")
				.catch(error => {
					this.fetching = false;
					console.error(error);
					throw error;
				});
      
			if (this.products.length === 0) {
				products.forEach((newProduct: Product) => {
					this.products.push(newProduct);
				});
			} else {
				products.forEach((newProduct: Product) => {
					if (!this.products.find(oldProduct => oldProduct.id === newProduct.id))
						this.products.push(newProduct);
				});
			}

			this.fetching = false;
		},
    
		async addProduct(category: string, price: string, name: string) {
			this.fetching = true;
			const { data: product } = await axios.get(`/menu/createRow/${category}/${price}/${name}`)
				.catch(error => {
					console.error(error);
					throw error;
				});
      
			this.products.push(product);
			this.fetching = false;
		},
	}
});