import type { orientationEnum } from "@ensol-test/shared/constants/orientation.enum";
import type { SimulationResponse } from "@ensol-test/types/simulation";
import { HttpError } from "../middlewares/httpError";
import type { IrradianceProvider } from "../providers/irradiance/irradiance.provider";

export class SimulationService {
	private readonly irradianceProvider: IrradianceProvider;

	constructor(irradianceProvider: IrradianceProvider) {
		this.irradianceProvider = irradianceProvider;
	}

	async calculateSimulation(
		latitude: number,
		longitude: number,
		orientation: keyof typeof orientationEnum,
		inclination: number,
		monthlyBill: number,
	): Promise<SimulationResponse> {
		const irradiance = await this.irradianceProvider.getYearlyIrradiance(
			latitude,
			longitude,
			orientation,
			inclination,
		);

		console.log("irradiance", irradiance);
		throw new HttpError("Not implemented", 501);
	}
}
