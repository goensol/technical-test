import {
  SimulationParameters,
  SimulationResponse,
} from "@ensol-test/types/simulations";

import { simulationService } from "./simulation.module";
import { pVCalcClient } from "../clients/clients.module";

export class SimulationUseCase {
  estimateSolarInstallation = async (
    params: SimulationParameters
  ): Promise<SimulationResponse> => {
    const optimalYearlyIrradiance: number =
      await pVCalcClient.getOptimalYearlyIrradiance(
        params.latitude,
        params.longitude
      );

    const kWConsumptionByYear: number =
      simulationService.calculateYearlyConsumptionFromBill(params.monthlyBill);

    const kwProductionByPanel: number =
      simulationService.calculateAnnualEnergyProductionByPVPanel(
        optimalYearlyIrradiance,
        params.orientation,
        params.inclination
      );

    const recommanderPanelCount: number = Math.ceil(
      kWConsumptionByYear / kwProductionByPanel
    );

    return {
      recommanderPanelCount,
      energyProductionEstimate: recommanderPanelCount * kwProductionByPanel,
    };
  };
}
