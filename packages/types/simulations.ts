export enum RoofOrientation {
    W = "W",
    SW = "SW",
    S = "S",
    SE = "SE",
}

export enum RoofInclination {
    None = 0,
    Ten = 10,
    Twenty = 20,
    Thirty = 30,
    Forty = 40,
    Fifty = 50,
    Sixty = 60,
    Seventy = 70,
    Eighty = 80,
    Ninety = 90,
}

export type SimulationParameters = {
    latitude: number;
    longitude: number;
    monthlyBill: number;
    roofInclination: RoofInclination;
    roofOrientation: RoofOrientation;
};
export type SimulationResponse = {
    estimatedPanels: number;
    yearlyEnergyProduction: number;
};
