import { asyncErrorMiddleware } from "@ensol-test/backend/middlewares/asyncErrorMiddleware";
import type {
	SimulationParameters,
	SimulationResponse,
} from "@ensol-test/types/simulations";

import express from "express";

const router = express.Router();

router.get(
	"/simulations",
	asyncErrorMiddleware<SimulationParameters, SimulationResponse>(
		async (req, res) => {
			//...

			res.json({});
		},
	),
);

export { router };
