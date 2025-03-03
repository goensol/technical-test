import type { ElectricityProvider } from "./electricity.provider";

export class LocalStorageElectricityProvider implements ElectricityProvider {
	/** c€/kWh */
	private readonly PRICE_PER_KWH_IN_CENTS: number = 20.62;

	getElectricityPrice(_year: number): number {
		return this.PRICE_PER_KWH_IN_CENTS;
	}

	calculateYearlyElectricityConsumption(
		monthlyBill: number,
		_year: number,
	): number {
		const yearlyEnergyConsumption =
			(monthlyBill * 100 * 12) / this.PRICE_PER_KWH_IN_CENTS;
		return yearlyEnergyConsumption;
	}
}
