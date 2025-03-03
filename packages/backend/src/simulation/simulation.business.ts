import {
    SimulationParameters,
    SimulationResponse,
} from "@ensol-test/types/simulations";
import { SimulationService } from "./simulation.service";
import { PVGISApi } from "../libs/PVGIS";

export class SimulationBusiness {
    static async getSolarSystemSimulation(
        simulation: SimulationParameters,
    ): Promise<SimulationResponse> {
        const {
            latitude,
            longitude,
            monthlyBill,
            roofInclination,
            roofOrientation,
        } = simulation;

        const yearlyElectricityConsumption =
            SimulationService.calculateYearlyElectricityConsumption(
                monthlyBill,
            );
        const yearlyIrradience =
            await PVGISApi.getYearlyIrradienceByCoordinates(
                latitude,
                longitude,
                roofOrientation,
                roofInclination,
            );

        const correctedYearlyIrradience =
            SimulationService.calculateYearlyIrradienceWithAzimuthAndInclination(
                yearlyIrradience,
                roofOrientation,
                roofInclination,
            );
        const yearlyProductionPerCapacity =
            SimulationService.calculateYearlyProductionPerCapacity(
                correctedYearlyIrradience,
            );

        const yearlyEnergyProduction =
            SimulationService.calculateYearlyProduction(
                yearlyProductionPerCapacity,
            );

        const estimatedPanels = SimulationService.calculateEstimatedPanels(
            yearlyElectricityConsumption,
            yearlyProductionPerCapacity,
        );

        return {
            estimatedPanels,
            yearlyEnergyProduction,
        };
    }
}
