import { RoofOrientation } from "@ensol-test/types/simulations";
import { query, ValidationChain } from "express-validator";

export const validateSimulationParams: ValidationChain[] = [
    query("latitude")
        .exists()
        .withMessage("Latitude is required")
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude must be a number between -90 and 90"),

    query("longitude")
        .exists()
        .withMessage("Longitude is required")
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude must be a number between -180 and 180"),

    query("monthlyBill")
        .exists()
        .withMessage("Monthly bill is required")
        .isInt({ min: 1 })
        .withMessage("Monthly bill must be a positive integer")
        .toInt(),

    query("roofInclination")
        .exists()
        .withMessage("Roof inclination is required")
        .isFloat({ min: 0, max: 90 })
        .withMessage("Roof inclination must be between 0° and 90°")
        .toFloat(),

    query("roofOrientation")
        .exists()
        .withMessage("Roof orientation is required")
        .isIn(Object.values(RoofOrientation))
        .withMessage("Roof orientation must be one of: W, SW, S, SE"),
];
