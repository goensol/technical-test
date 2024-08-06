import { InclinationEnum } from "@ensol-test/enums/inclination";
import { OrientationEnum } from "@ensol-test/enums/orientation";

export const SYSTEM_EFFICIENCY_RATIO = 0.8;

export const PHOTOVOLTAIC_PANEL_EFFICIENCY_RATIO = 0.21;
export const PHOTOVOLTAIC_PANEL_AREA_M2 = 1.95;

export const ELECTRICITY_PRICE_2024_EUROS_BY_KW = 0.22;

export const INCLINATION_EFFICIENCY_BY_ORIENTATION: {
  [key in OrientationEnum]: {
    [key in InclinationEnum]: number;
  };
} = {
  [OrientationEnum.W]: {
    [InclinationEnum.Ten]: 0.86,
    [InclinationEnum.Twenty]: 0.84,
    [InclinationEnum.Thirty]: 0.81,
    [InclinationEnum.Forty]: 0.77,
    [InclinationEnum.Fifty]: 0.72,
    [InclinationEnum.Sixty]: 0.67,
    [InclinationEnum.Seventy]: 0.62,
    [InclinationEnum.Eighty]: 0.56,
  },
  [OrientationEnum.SW]: {
    [InclinationEnum.Ten]: 0.9,
    [InclinationEnum.Twenty]: 0.93,
    [InclinationEnum.Thirty]: 0.94,
    [InclinationEnum.Forty]: 0.91,
    [InclinationEnum.Fifty]: 0.9,
    [InclinationEnum.Sixty]: 0.85,
    [InclinationEnum.Seventy]: 0.8,
    [InclinationEnum.Eighty]: 0.72,
  },
  [OrientationEnum.S]: {
    [InclinationEnum.Ten]: 0.93,
    [InclinationEnum.Twenty]: 0.98,
    [InclinationEnum.Thirty]: 1.0,
    [InclinationEnum.Forty]: 1.0,
    [InclinationEnum.Fifty]: 0.97,
    [InclinationEnum.Sixty]: 0.93,
    [InclinationEnum.Seventy]: 0.86,
    [InclinationEnum.Eighty]: 0.77,
  },
  [OrientationEnum.SE]: {
    [InclinationEnum.Ten]: 0.9,
    [InclinationEnum.Twenty]: 0.93,
    [InclinationEnum.Thirty]: 0.94,
    [InclinationEnum.Forty]: 0.91,
    [InclinationEnum.Fifty]: 0.9,
    [InclinationEnum.Sixty]: 0.85,
    [InclinationEnum.Seventy]: 0.8,
    [InclinationEnum.Eighty]: 0.72,
  },
  [OrientationEnum.E]: {
    [InclinationEnum.Ten]: 0.86,
    [InclinationEnum.Twenty]: 0.84,
    [InclinationEnum.Thirty]: 0.81,
    [InclinationEnum.Forty]: 0.77,
    [InclinationEnum.Fifty]: 0.72,
    [InclinationEnum.Sixty]: 0.67,
    [InclinationEnum.Seventy]: 0.62,
    [InclinationEnum.Eighty]: 0.56,
  },
};
