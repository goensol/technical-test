import {
    RoofInclination,
    RoofOrientation,
} from "@ensol-test/types/simulations";
import axios from "axios";
import { PVGISApiPVResponse } from "./types";

const MAP_ORIENTATIONS_TO_JRC_API_ASPECT = {
    S: 0,
    W: 90,
    SW: 45,
    SE: -45,
};

export class PVGISApi {
    static async getYearlyIrradienceByCoordinates(
        latitude: number,
        longitude: number,
        roofOrientation: RoofOrientation,
        roofInclination: RoofInclination,
    ) {
        try {
            const baseUrl = "https://re.jrc.ec.europa.eu/api/v5_3/PVcalc";

            const params = new URLSearchParams({
                lat: latitude.toString(),
                lon: longitude.toString(),
                loss: "14",
                outputformat: "json",
                peakpower: "1",
                angle: roofInclination.toString(),
                mountingplace: "building",
                aspect: MAP_ORIENTATIONS_TO_JRC_API_ASPECT[
                    roofOrientation
                ].toString(),
            });

            const response = await axios.get<PVGISApiPVResponse>(
                `${baseUrl}?${params}`,
            );

            const yearlyIrradiance =
                response.data.outputs.totals.fixed["H(i)_y"];

            return yearlyIrradiance;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "MRcalc API Error:",
                    error.response?.data || error.message,
                );

                if (error.response?.status === 400) {
                    throw new Error("Invalid coordinates or parameters");
                } else if (error.response?.status === 404) {
                    throw new Error(
                        "No radiation data available for these coordinates",
                    );
                } else if (error.response?.status === 429) {
                    throw new Error(
                        "Too many requests. Please try again later",
                    );
                }
            }
            console.log(error);
            throw new Error("Failed to fetch solar irradiance data");
        }
    }
}
