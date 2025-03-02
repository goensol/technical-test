import { asyncErrorMiddleware } from "@ensol-test/backend/middlewares/asyncErrorMiddleware";
import type {
	SimulationParameters,
	SimulationResponse,
} from "@ensol-test/types/simulation";

import express from "express";
import { SimulationController } from "../controllers/simulation";
import { PgvisIrradianceProvider } from "../providers/irradiance/pgvis-api-irradiance.provider";
import { SimulationService } from "../services/simulation";

const router = express.Router();

const irradianceProvider = new PgvisIrradianceProvider();
const simulationService = new SimulationService(irradianceProvider);
const simulationController = new SimulationController(simulationService);

router.get(
	"/simulations",
	asyncErrorMiddleware<SimulationParameters, SimulationResponse>(
		simulationController.getSimulationResults.bind(simulationController),
	),
);

export { router };
