export type Orientation = 'S'| 'W' | 'E' | 'SE' | 'SW';

export type SimulationParameters = {
    latitude: number;
    longitude: number;
    inclination: number;
    monthlyBill: number;
    orientation: Orientation;
};
export type SimulationResponse = {
    numberOfPanel: number;
    energyProduction: number;
};
