import { Stringified } from "@ensol-test/shared/utils/type.util";
import { asyncErrorMiddleware } from "@ensol-test/backend/middlewares/asyncErrorMiddleware";
import { simulatorSchema } from "@ensol-test/shared/validations/simulator";
import {
  SimulationParameters,
  SimulationResponse,
} from "@ensol-test/types/simulations";

import express from "express";
import { getOptimalYearlyIrradiance } from "../clients/PVCalcClient";

const router = express.Router();

router.get(
  "/simulations",
  asyncErrorMiddleware<Stringified<SimulationParameters>, SimulationResponse>(
    async (req, res) => {
      const schema: SimulationParameters = simulatorSchema.parse(req.query);
      const optimalYearlyIrradiance = await getOptimalYearlyIrradiance(
        schema.latitude,
        schema.longitude
      );
      res.json({ recommanderPanelCount: 7, energyProductionEstimate: 9000 });
    }
  )
);

export { router };
