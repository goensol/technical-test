import type { orientationEnum } from "@ensol-test/shared/constants/orientation.enum";

export interface IrradianceProvider {
	/**
	 * @returns Yearly irradiance in kWh/m²/year
	 */
	getYearlyIrradiance(
		latitude: number,
		longitude: number,
		orientation?: keyof typeof orientationEnum,
		inclination?: number,
	): Promise<number>;
}
