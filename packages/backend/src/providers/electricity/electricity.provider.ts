export interface ElectricityProvider {
	/**
	 *
	 * @returns Electricity price in cents per kWh (c€/kWh)
	 */
	getElectricityPrice(year: number): number;

	/**
	 * @param monthlyBill Monthly bill in €
	 *
	 * @returns Yearly electricity consumption in kWh/year
	 */
	calculateYearlyElectricityConsumption(
		monthlyBill: number,
		year: number,
	): number;
}
