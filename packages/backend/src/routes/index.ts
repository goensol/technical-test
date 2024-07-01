import { asyncErrorMiddleware } from '@ensol-test/backend/middlewares/asyncErrorMiddleware';
import { SimulationParameters, SimulationResponse } from '@ensol-test/types/simulations';

import express from 'express';
import { computeInstall } from '../engine/compute';

const router = express.Router();

router.get(
  '/simulations',
  asyncErrorMiddleware<SimulationParameters, SimulationResponse>(async (req, res) => {

    const results = computeInstall(req.query) // @ts-ignore

    res.json(await results);
  }),
);

export { router };
