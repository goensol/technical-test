import type { orientationEnum } from "@ensol-test/shared/constants/orientation.enum";
import type { SimulationResponse } from "@ensol-test/types/simulation";
import { HttpError } from "../middlewares/httpError";
import type { ElectricityProvider } from "../providers/electricity/electricity.provider";
import type { IrradianceProvider } from "../providers/irradiance/irradiance.provider";
import type {
	PanelProvider,
	PanelSpecifications,
} from "../providers/panel/panel.provider";

export class SimulationService {
	private readonly irradianceProvider: IrradianceProvider;
	private readonly panelProvider: PanelProvider;
	private readonly electricityProvider: ElectricityProvider;

	private readonly panelReference = "DualSun Flash 425 Shingle Black";
	private readonly systemEfficiencyRatio = 0.8;
	private readonly correctInstallationSizeRatio = 0.85;

	constructor(
		irradianceProvider: IrradianceProvider,
		panelProvider: PanelProvider,
		electricityProvider: ElectricityProvider,
	) {
		this.irradianceProvider = irradianceProvider;
		this.panelProvider = panelProvider;
		this.electricityProvider = electricityProvider;
	}

	async calculateSimulation(
		latitude: number,
		longitude: number,
		orientation: keyof typeof orientationEnum,
		inclination: number,
		monthlyBill: number,
	): Promise<SimulationResponse> {
		const yearlyIrradiance = await this.irradianceProvider.getYearlyIrradiance(
			latitude,
			longitude,
			orientation,
			inclination,
		);

		const panel = this.panelProvider.getPanelSpecifications(
			this.panelReference,
		);
		if (!panel) {
			throw new HttpError(`Panel not found ${this.panelReference}`, 404);
		}

		const yearlyProductionPerCapacity =
			this.calculateYearlyProductionPerCapacity(yearlyIrradiance, panel);

		const yearlyElectricityConsumption =
			this.electricityProvider.calculateYearlyElectricityConsumption(
				monthlyBill,
				new Date().getFullYear(),
			);

		const simulationResults = this.calculateRequiredNumberOfPanels(
			yearlyElectricityConsumption,
			yearlyProductionPerCapacity,
			panel,
		);

		return simulationResults;
	}

	/** Private methods */

	/**
	 * Calculates the yearly energy production per installed capacity (kWh/kWc/year).
	 *
	 * @param yearlyIrradiance - Yearly solar irradiance in kWh/m²/year.
	 * @param panel - The selected solar panel specifications.
	 *
	 * @returns The estimated yearly energy production per kWc.
	 */
	private calculateYearlyProductionPerCapacity(
		yearlyIrradiance: number,
		panel: PanelSpecifications,
	): number {
		const panelPowerAreaRatio =
			this.panelProvider.calculatePowerAreaRatio(panel);

		const yearlyProductionPerCapacity =
			(yearlyIrradiance *
				this.systemEfficiencyRatio *
				panel.photovoltaicEfficiency) /
			panelPowerAreaRatio;
		return yearlyProductionPerCapacity;
	}

	/**
	 * Calculates the required number of panels to cover the target electricity consumption.
	 *
	 * @param yearlyElectricityConsumption - The user's yearly electricity consumption (kWh).
	 * @param yearlyProductionPerKwc - The estimated yearly energy production per kWc.
	 * @param panel - The selected solar panel specifications.
	 *
	 * @returns A `SimulationResponse` with the number of required panels and estimated energy production.
	 */
	private calculateRequiredNumberOfPanels(
		yearlyElectricityConsumption: number,
		yearlyProductionPerCapacity: number,
		panel: PanelSpecifications,
	): SimulationResponse {
		const targetYearlyEnergyProduction =
			this.correctInstallationSizeRatio * yearlyElectricityConsumption;

		const panelYearlyEnergyProduction =
			yearlyProductionPerCapacity * panel.power;

		const numberOfPanels = Math.ceil(
			targetYearlyEnergyProduction / panelYearlyEnergyProduction,
		);

		const solarEnergyProduction = numberOfPanels * panelYearlyEnergyProduction;

		return {
			numberOfPanels,
			solarEnergyProduction: Math.round(solarEnergyProduction),
		};
	}
}
