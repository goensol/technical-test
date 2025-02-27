import { asyncErrorMiddleware } from "@ensol-test/backend/middlewares/asyncErrorMiddleware";
import {
    RoofOrientation,
    SimulationParameters,
    SimulationResponse,
} from "@ensol-test/types/simulations";

import express from "express";

import { ValidationError, validationResult } from "express-validator";
import { validateSimulationParams } from "./helpers";
import { SimulationParametersQuery } from "../simulation/simulation.types";
import { SimulationBusiness } from "../simulation/simulation.business";

const router = express.Router();

router.get(
    "/simulations",
    validateSimulationParams,
    asyncErrorMiddleware<
        {},
        SimulationResponse | { errors: ValidationError[] },
        {},
        SimulationParametersQuery
    >(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const params: SimulationParameters = {
            latitude: parseFloat(req.query.latitude),
            longitude: parseFloat(req.query.longitude),
            monthlyBill: parseInt(req.query.monthlyBill, 10),
            roofInclination: parseFloat(req.query.roofInclination),
            roofOrientation: req.query.roofOrientation as RoofOrientation,
        };

        const simulation =
            await SimulationBusiness.getSolarSystemSimulation(params);

        res.json({
            ...simulation,
        });
    }),
);

export { router };
