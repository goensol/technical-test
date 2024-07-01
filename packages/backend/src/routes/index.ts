import { asyncErrorMiddleware } from '@ensol-test/backend/middlewares/asyncErrorMiddleware';
import { SimulationParameters, SimulationResponse } from '@ensol-test/types/simulations';

import express from 'express';
import { computeInstall } from '../engine/compute';

const router = express.Router();

router.get(
  '/simulations',
  asyncErrorMiddleware<SimulationParameters, SimulationResponse>(async (req, res) => {

    if (
      req.query.inclination < 0 || req.query.inclination > 90 || req.query.monthlyBill < 0 || !['S', 'E', 'SE', 'SW', 'W'].includes(req.query.orientation) 
    ) {
      res.status(400).send()
    }

    const results = computeInstall(req.query) // @ts-ignore

    res.json(await results);
  }),
);

export { router };
