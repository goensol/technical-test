import express, { Express } from "express";

import cors from "cors";

import { router } from "./simulation/simulation.route";

const app: Express = express();
const port = 8000;

app.use(cors());

app.use("/", router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
