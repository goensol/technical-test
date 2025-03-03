import {
    RoofInclination,
    RoofOrientation,
} from "@ensol-test/types/simulations";
import {
    EFFICIENCY_LOSS_PER_ORIENTATION,
    ELECTRICITY_COST_PER_KWH_FRANCE_2024,
    GLOBAL_SYSTEM_EFFICIENCY,
    PANELS_SOLARS,
} from "./simulation.constants";

export class SimulationService {
    /**
     * Calculates the yearly electricity consumption based on the given monthly bill
     * @param {number} monthlyBill The monthly bill of the customer
     * @returns {number} The yearly electricity consumption of the customer in kWh/an
     */

    static calculateYearlyElectricityConsumption(monthlyBill: number) {
        return (monthlyBill / ELECTRICITY_COST_PER_KWH_FRANCE_2024) * 12;
    }

    /**
     * Calculates the yearly irradiance taking into account the loss of efficiency
     * depending on the roof's orientation and inclination
     * @param {number} yearlyIrradience The yearly irradiance given by the PVGIS API in kWh/m2/year
     * @param {RoofOrientation} roofOrientation The orientation of the roof
     * @param {RoofInclination} roofInclination The inclination of the roof
     * @returns {number} The yearly irradiance taking into account the loss of efficiency in kWh/m2/year
     */
    static calculateYearlyIrradienceWithAzimuthAndInclination(
        yearlyIrradience: number,
        roofOrientation: RoofOrientation,
        roofInclination: RoofInclination,
    ) {
        return (
            yearlyIrradience *
            (1 -
                EFFICIENCY_LOSS_PER_ORIENTATION[roofOrientation][
                    roofInclination
                ])
        );
    }

    /**
     * Calculates the yearly production per capacity in kWh/kWc/year
     * @param {number} yearlyIrradience The yearly irradiance taking into account the loss of efficiency in kWh/m2/year
     * @returns {number} The yearly production per capacity in kWh/kWc/year
     */
    static calculateYearlyProductionPerCapacity(yearlyIrradience: number) {
        const selectedPanel = PANELS_SOLARS["DualSun Flash 425 TopCon"];
        return (
            (yearlyIrradience *
                selectedPanel.efficiency *
                GLOBAL_SYSTEM_EFFICIENCY) /
            selectedPanel.powerAreaRatio
        );
    }

    /**
     * Calculates the yearly production based on the given capacity
     * @param {number} capacity The capacity of the solar panel installation in kWc
     * @returns {number} The yearly production of the solar panel installation in kWh/year
     */
    static calculateYearlyProduction(capacity: number) {
        const selectedPanel = PANELS_SOLARS["DualSun Flash 425 TopCon"];
        return capacity * selectedPanel.productionCapacity;
    }

    /**
     * Calculates the estimated number of panels needed for a given yearly electricity consumption
     * @param {number} yearlyElectricityConsumption The yearly electricity consumption of the customer in kWh/year
     * @param {number} yearlyProductionPerCapacity The yearly production per capacity in kWh/kWc/year
     * @returns {number} The estimated number of panels needed
     */
    static calculateEstimatedPanels(
        yearlyElectricityConsumption: number,
        yearlyProductionPerCapacity: number,
    ) {
        const estimatedInstallationSize = Math.floor(
            yearlyElectricityConsumption / yearlyProductionPerCapacity,
        );
        return Math.round(
            (estimatedInstallationSize /
                PANELS_SOLARS["DualSun Flash 425 TopCon"].power) *
                1000,
        );
    }
}
