import { asyncErrorMiddleware } from "@ensol-test/backend/middlewares/asyncErrorMiddleware";
import type {
	SimulationParameters,
	SimulationResponse,
} from "@ensol-test/types/simulation";

import express from "express";
import { SimulationController } from "../controllers/simulation";
import { LocalStorageElectricityProvider } from "../providers/electricity/local-storage-electricity.provider";
import { PgvisIrradianceProvider } from "../providers/irradiance/pgvis-api-irradiance.provider";
import { JsonPanelProvider } from "../providers/panel/json-panel.provider";
import { SimulationService } from "../services/simulation";

const router = express.Router();

const irradianceProvider = new PgvisIrradianceProvider();
const electricityProvider = new LocalStorageElectricityProvider();
const panelProvider = new JsonPanelProvider();
const simulationService = new SimulationService(
	irradianceProvider,
	panelProvider,
	electricityProvider,
);
const simulationController = new SimulationController(simulationService);

router.get(
	"/simulations",
	asyncErrorMiddleware<SimulationParameters, SimulationResponse>(
		simulationController.getSimulationResults.bind(simulationController),
	),
);

export { router };
