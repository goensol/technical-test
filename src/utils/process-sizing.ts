import {
  DEFAULT_SIMULATION_RESULTS,
  INDEX_CORRECT_SIZING,
  KWH_PRICE,
  PANEL_EFFICIENCY,
  POWER_PER_PANEL,
  POWER_TO_AREA_RATIO,
  SYSTEM_EFFICIENCY,
} from "./../constants/index";
import { EFFICIENCY_LOSS_DUE_TO_ORIENTATION_AND_INCLINATION } from "@ensol-test/constants";
import {
  Orientation,
  SimulationFormState,
  SimulationResults,
} from "@ensol-test/interfaces";

interface IrradiancePerMonth {
  year: number;
  month: number;
  "H(i_opt)_m": number;
}

interface PVGSISAPIResult {
  inputs: {};
  outputs: {
    monthly: IrradiancePerMonth[];
  };
}

export const getSimulationResults = (
  apiResult: PVGSISAPIResult,
  simulationForm: SimulationFormState
): SimulationResults => {
  let simulationResults: SimulationResults = { ...DEFAULT_SIMULATION_RESULTS };
  const { inclination, orientation, monthlyBill } = simulationForm;

  simulationResults.optimalYearlyIrradiance =
    getOptimalYearlyIrradianceFromAPI(apiResult);
  simulationResults.efficiencyLossOrientationInclination =
    getEfficiencyLossDueToOrientationAndInclination(orientation, inclination);
  simulationResults.yearlyIrradiance = getYearlyIrradiance(
    simulationResults.optimalYearlyIrradiance,
    simulationResults.efficiencyLossOrientationInclination
  );
  simulationResults.yearlyProductionPerCapacity =
    getYearlyProductionPerCapacity(simulationResults.yearlyIrradiance);
  simulationResults.customerYearlyUsage = getCustomerYearlyUsage(monthlyBill);
  simulationResults.estimationOfCustomerInstallationPower =
    getEstimationOfCustomerInstallationPower(
      simulationResults.customerYearlyUsage,
      simulationResults.yearlyProductionPerCapacity
    );
  simulationResults.nbOfPanels = getNbOfPanels(
    simulationResults.estimationOfCustomerInstallationPower
  );
  simulationResults.installationCapacity = getInstallationCapacity(
    simulationResults.nbOfPanels
  );
  simulationResults.yearlyProd = getYearlyProd(
    simulationResults.yearlyProductionPerCapacity,
    simulationResults.installationCapacity
  );

  return simulationResults;
};

export const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) {
    return 0;
  }

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length;
};

export const getOptimalYearlyIrradianceFromAPI = (
  apiResult: PVGSISAPIResult
): number => {
  let optimalYearlyIrradiance = 0;
  let irradianceOneYear = 0;
  let irradianceAllYears = [];

  for (
    let indexMonth = 0;
    indexMonth < apiResult.outputs.monthly.length;
    indexMonth++
  ) {
    irradianceOneYear += apiResult.outputs.monthly[indexMonth]["H(i_opt)_m"];

    if (indexMonth % 11 === 0 && indexMonth !== 0) {
      irradianceAllYears.push(irradianceOneYear);
      irradianceOneYear = 0;
    }
  }

  optimalYearlyIrradiance = calculateAverage(irradianceAllYears);

  return parseFloat(optimalYearlyIrradiance.toFixed(2));
};

export const getEfficiencyLossDueToOrientationAndInclination = (
  orientation: Orientation,
  inclination: number
): number => {
  const key = `${orientation} ${inclination}`;
  const efficiencyLoss =
    EFFICIENCY_LOSS_DUE_TO_ORIENTATION_AND_INCLINATION[key];

  return efficiencyLoss;
};

export const getYearlyIrradiance = (
  optimalYearlyIrradiance: number,
  efficiencyLossOrientationInclination: number
): number => {
  return parseFloat(
    (
      optimalYearlyIrradiance *
      (1 - efficiencyLossOrientationInclination)
    ).toFixed(2)
  );
};

export const getYearlyProductionPerCapacity = (
  yearlyIrradiance: number
): number => {
  return parseFloat(
    (
      (yearlyIrradiance * PANEL_EFFICIENCY * SYSTEM_EFFICIENCY) /
      POWER_TO_AREA_RATIO
    ).toFixed(2)
  );
};

export const getCustomerYearlyUsage = (monthlyBill: number) => {
  return parseFloat(((monthlyBill / KWH_PRICE) * 12).toFixed(2));
};

export const getEstimationOfCustomerInstallationPower = (
  customerYearlyUsage: number,
  yearlyProductionPerCapacity: number
): number => {
  return parseFloat(
    (
      (customerYearlyUsage * INDEX_CORRECT_SIZING) /
      yearlyProductionPerCapacity
    ).toFixed(2)
  );
};

export const getNbOfPanels = (
  estimationOfCustomerInstallationPower: number
) => {
  return Math.ceil(estimationOfCustomerInstallationPower / POWER_PER_PANEL);
};

export const getInstallationCapacity = (nbOfPanels: number) => {
  return POWER_PER_PANEL * nbOfPanels;
};

export const getYearlyProd = (
  yearlyProductionPerCapacity: number,
  installationCapacity: number
) => {
  return Math.ceil(yearlyProductionPerCapacity * installationCapacity);
};
