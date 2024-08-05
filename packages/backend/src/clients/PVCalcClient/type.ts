export type MonthlyOptimalRadiationByYear = {
  year: number;
  "H(i_opt)_m": number;
};

export type ResponseData = {
  outputs: {
    monthly: MonthlyOptimalRadiationByYear[];
  };
};

export type QueryParams = {
  lat: number;
  lon: number;
  startyear: number;
  endyear: number;
  outputformat: "json";
  optrad: number;
  usehorizon: number;
};
