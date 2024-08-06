import { httpClient } from "@ensol-test/shared/abstractions/httpClient";
import { BASE_QUERY_PARAMS, BASE_URL } from "./constant";
import { QueryParams, ResponseData } from "./type";
import { calculateYearlyOptimalIrradience } from "./service";

export class PVCalcClient {
  getOptimalYearlyIrradiance = async (latitude: number, longitude: number) => {
    const queryParams = { ...BASE_QUERY_PARAMS, lat: latitude, lon: longitude };
    const response = await httpClient(BASE_URL).httpGet<
      ResponseData,
      QueryParams
    >("", {
      params: queryParams,
    });

    const averageRadiationByYear = calculateYearlyOptimalIrradience(
      response.outputs.monthly
    );
    return averageRadiationByYear;
  };
}
