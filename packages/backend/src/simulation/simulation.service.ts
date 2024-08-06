import { OrientationEnum } from "@ensol-test/enums/orientation";
import { formulaUtil } from "../utils/utils.module";
import {
  ELECTRICITY_PRICE_2024_EUROS_BY_KW,
  INCLINATION_EFFICIENCY_BY_ORIENTATION,
  PHOTOVOLTAIC_PANEL_AREA_M2,
  PHOTOVOLTAIC_PANEL_EFFICIENCY_RATIO,
  SYSTEM_EFFICIENCY_RATIO,
} from "./simulation.constant";
import { InclinationEnum } from "@ensol-test/enums/inclination";

export class SimulationService {
  calculateYearlyConsumptionFromBill(monthlyBill: number): number {
    return formulaUtil.calculateYearlyConsumptionFromBill(
      monthlyBill,
      ELECTRICITY_PRICE_2024_EUROS_BY_KW
    );
  }

  calculateAnnualEnergyProductionByPVPanel(
    optimalYearlyIrradiance: number,
    orientation: OrientationEnum,
    inclination: InclinationEnum
  ): number {
    const inclinationEfficiency: number =
      INCLINATION_EFFICIENCY_BY_ORIENTATION[orientation][inclination];

    return formulaUtil.calculateAnnualEnergyProductionByPVPanel(
      optimalYearlyIrradiance,
      SYSTEM_EFFICIENCY_RATIO,
      PHOTOVOLTAIC_PANEL_EFFICIENCY_RATIO,
      PHOTOVOLTAIC_PANEL_AREA_M2,
      inclinationEfficiency
    );
  }
}
