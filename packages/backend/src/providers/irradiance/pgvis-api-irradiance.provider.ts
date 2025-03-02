import fs from "node:fs";
import path from "node:path";
import { HttpError } from "@ensol-test/backend/middlewares/httpError";
import type { orientationEnum } from "@ensol-test/shared/constants/orientation.enum";
import axios from "axios";
import type { IrradianceProvider } from "./irradiance.provider";

type PVGISResponse = {
	outputs: {
		monthly: {
			/** Irradiation on optimally inclined plane in kWh/m²/month */
			"H(i_opt)_m": number;
		}[];
	};
};

type IrradianceLossData = {
	orientation: keyof typeof orientationEnum;
	inclination: number;
	lookup: string;
	/** % */
	efficiency_loss: number;
};

export class PgvisIrradianceProvider implements IrradianceProvider {
	private readonly PGVIS_API_URL = "https://re.jrc.ec.europa.eu/api/MRcalc";
	private readonly IRRADIANCE_LOSS_DATA_PATH = path.resolve(
		__dirname,
		"./irradiance-loss.data.json",
	);

	private readonly energyLossData: IrradianceLossData[];

	constructor() {
		const data = this.loadDataFromFile();
		this.energyLossData = data;
	}

	async getYearlyIrradiance(
		latitude: number,
		longitude: number,
		orientation?: keyof typeof orientationEnum,
		inclination?: number,
	): Promise<number> {
		const optimalIrradiance = await this.fetchOptimalIrradiance(
			latitude,
			longitude,
		);

		if (!orientation || !inclination) return optimalIrradiance;

		const energyLoss = this.getIrradianceLoss(orientation, inclination);
		return optimalIrradiance * (1 - energyLoss / 100);
	}

	/** Private methods */

	private loadDataFromFile() {
		return JSON.parse(fs.readFileSync(this.IRRADIANCE_LOSS_DATA_PATH, "utf-8"));
	}

	private async fetchOptimalIrradiance(
		latitude: number,
		longitude: number,
		startYear = 2005, // first year of data
		endYear = 2023, // last year of data
	): Promise<number> {
		try {
			const response = await axios.get<PVGISResponse>(this.PGVIS_API_URL, {
				params: {
					lat: latitude,
					lon: longitude,
					outputformat: "json",
					optrad: 1,
					startyear: startYear,
					endyear: endYear,
				},
			});

			if (response.status !== 200) {
				throw new HttpError(
					`Error fetching data from PVGIS API: ${response.statusText}`,
					response.status,
				);
			}

			const data = response.data.outputs.monthly;
			const totalIrradiance = data.reduce(
				(acc, month) => acc + month["H(i_opt)_m"],
				0,
			);
			return totalIrradiance / (endYear - startYear);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				throw new HttpError(
					`Connexion to PVGIS API failed: ${error.message}`,
					503,
				);
			}

			throw error;
		}
	}

	private getIrradianceLoss(
		orientation: keyof typeof orientationEnum,
		inclination: number,
	): number {
		const lookup = `${orientation}_${inclination}`;
		const energyLoss = this.energyLossData.find(
			(entry) => entry.lookup === lookup,
		);

		if (energyLoss?.efficiency_loss === undefined)
			console.warn(
				`No energy loss found for the following parameters: ${JSON.stringify({
					orientation,
					inclination,
				})}`,
			);

		return energyLoss?.efficiency_loss ?? 0;
	}
}
