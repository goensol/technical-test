import {
  EfficiencyLossData,
  Orientation,
  SimulationFormState,
  SimulationResults,
} from "@ensol-test/interfaces";
import { createOrientationData } from "@ensol-test/utils/form-helpers";

export const PANEL_EFFICIENCY: number = 0.21;
export const SYSTEM_EFFICIENCY: number = 0.8;
export const POWER_TO_AREA_RATIO: number = 0.22;

export const KWH_PRICE: number = 0.2;

export const POWER_PER_PANEL: number = 0.425; //kWc / unit

export const INDEX_CORRECT_SIZING: number = 0.85;

export const DEFAULT_SIMULATION_FORM_STATE: SimulationFormState = {
  latitude: 47.099,
  longitude: -1.187,
  inclination: 30,
  orientation: Orientation.SOUTH,
  monthlyBill: 300,
};

export const INITIAL_MAP_COORDINATES = [];

export const ORIENTATION_DATA = createOrientationData();

export const INCLINAISON_DATA = [
  { value: 10, label: "10°" },
  { value: 20, label: "20°" },
  { value: 30, label: "30°" },
  { value: 40, label: "40°" },
  { value: 50, label: "50°" },
  { value: 60, label: "60°" },
  { value: 70, label: "70°" },
  { value: 80, label: "80°" },
];

export const DEFAULT_SIMULATION_RESULTS: SimulationResults = {
  optimalYearlyIrradiance: 0,
  efficiencyLossOrientationInclination: 0,
  yearlyIrradiance: 0,
  yearlyProductionPerCapacity: 0,
  customerYearlyUsage: 0,
  estimationOfCustomerInstallationPower: 0,
  nbOfPanels: 0,
  installationCapacity: 0,
  yearlyProd: 0,
};

export const EFFICIENCY_LOSS_DUE_TO_ORIENTATION_AND_INCLINATION: EfficiencyLossData =
  {
    "Sud 10": 0.07,
    "Sud 20": 0.02,
    "Sud 30": 0.0,
    "Sud 40": 0.0,
    "Sud 50": 0.03,
    "Sud 60": 0.07,
    "Sud 70": 0.14,
    "Sud 80": 0.23,
    "Est 10": 0.14,
    "Est 20": 0.16,
    "Est 30": 0.19,
    "Est 40": 0.23,
    "Est 50": 0.28,
    "Est 60": 0.33,
    "Est 70": 0.38,
    "Est 80": 0.44,
    "Ouest 10": 0.14,
    "Ouest 20": 0.16,
    "Ouest 30": 0.19,
    "Ouest 40": 0.23,
    "Ouest 50": 0.28,
    "Ouest 60": 0.33,
    "Ouest 70": 0.38,
    "Ouest 80": 0.44,
    "Sud-Est 10": 0.1,
    "Sud-Est 20": 0.07,
    "Sud-Est 30": 0.06,
    "Sud-Est 40": 0.09,
    "Sud-Est 50": 0.1,
    "Sud-Est 60": 0.15,
    "Sud-Est 70": 0.2,
    "Sud-Est 80": 0.28,
    "Sud-Ouest 10": 0.1,
    "Sud-Ouest 20": 0.07,
    "Sud-Ouest 30": 0.06,
    "Sud-Ouest 40": 0.09,
    "Sud-Ouest 50": 0.1,
    "Sud-Ouest 60": 0.15,
    "Sud-Ouest 70": 0.2,
    "Sud-Ouest 80": 0.28,
  };
