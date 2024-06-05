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

export interface SimulationFormValidation {
  isValid: boolean;
  errors: Partial<Record<keyof SimulationFormState, string>>;
}
