import { asyncErrorMiddleware } from "@ensol-test/backend/middlewares/asyncErrorMiddleware";
import { Stringified } from "@ensol-test/shared/utils/type.util";
import { simulationSchema } from "@ensol-test/shared/validations/simulation";
import {
  SimulationParameters,
  SimulationResponse,
} from "@ensol-test/types/simulations";

import express from "express";
import { simulationUseCase } from "./simulation.module";

const router = express.Router();

router.get(
  "/simulations",
  asyncErrorMiddleware<Stringified<SimulationParameters>, SimulationResponse>(
    async (req, res) => {
      const params: SimulationParameters = simulationSchema.parse(req.query);

      const simulationResponse: SimulationResponse =
        await simulationUseCase.estimateSolarInstallation(params);

      res.json(simulationResponse);
    }
  )
);

export { router };
