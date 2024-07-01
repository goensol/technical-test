export type SimulationParameters = {
    latitude: number;
    longitude: number;
    inclination: number;
    monthlyBill: number;
};
export type SimulationResponse = {
    numberOfPanel: number;
    energyProduction: number;
};
