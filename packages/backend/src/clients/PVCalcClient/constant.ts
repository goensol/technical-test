import { QueryParams } from "./type";

export const BASE_URL = "https://re.jrc.ec.europa.eu/api/MRcalc";

export const BASE_QUERY_PARAMS: Omit<QueryParams, "lat" | "lon"> = {
  startyear: 2005,
  endyear: 2016,
  outputformat: "json",
  optrad: 1,
  usehorizon: 0,
};
