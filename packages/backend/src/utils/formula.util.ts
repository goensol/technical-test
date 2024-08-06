export class FormulaUtil {
  /**
   * Calculates the yearly electricity consumption in kWh based on the monthly bill.
   * @param monthlyBill - The amount of the monthly electricity bill in euros.
   * @param electricityPrice - The price of electricity in euros for 1KW.
   * @returns The yearly electricity consumption in kWh.
   */
  calculateYearlyConsumptionFromBill(
    monthlyBill: number,
    electricityPrice: number
  ): number {
    return (monthlyBill / electricityPrice) * 12;
  }

  /**
   * Calculates the total kWh produced by photovoltaic panels in a year.
   * @param optimalYearlyIrradiance - The optimal yearly irradiance in kWh/m²/year.
   * @param systemEfficiencyRatio - The efficiency ratio of the photovoltaic system.
   * @param panelEfficiencyRatio - The efficiency ratio of the photovoltaic panel.
   * @param panelAreaM2 - The area of one photovoltaic panel in square meters.
   * @param inclinationEfficiency - The efficiency ratio of inclination depending on orientation
   * @returns The total kWh produced by the panels in a year.
   */
  calculateAnnualEnergyProductionByPVPanel(
    optimalYearlyIrradiance: number,
    systemEfficiencyRatio: number,
    panelEfficiencyRatio: number,
    panelAreaM2: number,
    inclinationEfficiency: number
  ): number {
    return (
      optimalYearlyIrradiance *
      systemEfficiencyRatio *
      panelEfficiencyRatio *
      panelAreaM2 *
      inclinationEfficiency
    );
  }
}
