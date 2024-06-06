export interface SimulationFormState {
  latitude: number;
  longitude: number;
  inclination: number;
  orientation: Orientation;
  monthlyBill: number;
}

export enum Orientation {
  WEST = "Ouest",
  SOUTH_WEST = "Sud-Ouest",
  SOUTH = "Sud",
  SOUTH_EAST = "Sud-Est",
  EAST = "Est",
}

export enum SimulationStatus {
  NOT_STARTED,
  RUNNING,
  SUCCESS,
  FAILURE,
}

export interface SimulationFormValidation {
  isValid: boolean;
  errors: Partial<Record<keyof SimulationFormState, string>>;
}

export interface SimulationResults {
  optimalYearlyIrradiance: number;
  efficiencyLossOrientationInclination: number;
  yearlyIrradiance: number;
  yearlyProductionPerCapacity: number;
  customerYearlyUsage: number;
  estimationOfCustomerInstallationPower: number;
  nbOfPanels: number;
  installationCapacity: number;
  yearlyProd: number;
}
export interface SizingSliceState {
  data: SimulationResults;
  simulationStatus: SimulationStatus;
  loading: boolean;
  error: string | null;
}

export interface EfficiencyLossData {
  [key: string]: number;
}
