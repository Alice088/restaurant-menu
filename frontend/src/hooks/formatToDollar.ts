export function formatToDollar(number: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		currencySign: "accounting",
		minimumFractionDigits: 0,
		maximumFractionDigits: 20
	}).format(number);
}