import {
    RoofInclination,
    RoofOrientation,
} from "@ensol-test/types/simulations";

export const ELECTRICITY_COST_PER_KWH_FRANCE_2024 = 0.22;
export const GLOBAL_SYSTEM_EFFICIENCY = 0.8;

export const PANELS_SOLARS = {
    "DualSun Flash 425 TopCon": {
        powerAreaRatio: 0.22,
        efficiency: 0.21,
        power: 425,
        productionCapacity: 2.98,
    },
};

export const EFFICIENCY_LOSS_PER_ORIENTATION: {
    [key in RoofOrientation]: {
        [key in RoofInclination]: number;
    };
} = {
    [RoofOrientation.W]: {
        [RoofInclination.None]: 0.2,
        [RoofInclination.Ten]: 0.18,
        [RoofInclination.Twenty]: 0.16,
        [RoofInclination.Thirty]: 0.15,
        [RoofInclination.Forty]: 0.16,
        [RoofInclination.Fifty]: 0.18,
        [RoofInclination.Sixty]: 0.2,
        [RoofInclination.Seventy]: 0.25,
        [RoofInclination.Eighty]: 0.3,
        [RoofInclination.Ninety]: 0.35,
    },
    [RoofOrientation.SW]: {
        [RoofInclination.None]: 0.15,
        [RoofInclination.Ten]: 0.12,
        [RoofInclination.Twenty]: 0.1,
        [RoofInclination.Thirty]: 0.08,
        [RoofInclination.Forty]: 0.1,
        [RoofInclination.Fifty]: 0.12,
        [RoofInclination.Sixty]: 0.15,
        [RoofInclination.Seventy]: 0.2,
        [RoofInclination.Eighty]: 0.25,
        [RoofInclination.Ninety]: 0.3,
    },
    [RoofOrientation.S]: {
        [RoofInclination.None]: 0.12,
        [RoofInclination.Ten]: 0.08,
        [RoofInclination.Twenty]: 0.05,
        [RoofInclination.Thirty]: 0.0, // Optimal
        [RoofInclination.Forty]: 0.03,
        [RoofInclination.Fifty]: 0.06,
        [RoofInclination.Sixty]: 0.1,
        [RoofInclination.Seventy]: 0.15,
        [RoofInclination.Eighty]: 0.2,
        [RoofInclination.Ninety]: 0.25,
    },
    [RoofOrientation.SE]: {
        [RoofInclination.None]: 0.15,
        [RoofInclination.Ten]: 0.12,
        [RoofInclination.Twenty]: 0.1,
        [RoofInclination.Thirty]: 0.08,
        [RoofInclination.Forty]: 0.1,
        [RoofInclination.Fifty]: 0.12,
        [RoofInclination.Sixty]: 0.15,
        [RoofInclination.Seventy]: 0.2,
        [RoofInclination.Eighty]: 0.25,
        [RoofInclination.Ninety]: 0.3,
    },
};
