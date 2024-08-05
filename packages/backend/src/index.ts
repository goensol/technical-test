import express, { Express, NextFunction } from "express";

import cors from "cors";

import { router } from "./routes";

const app: Express = express();
const port = 8000;

app.use(cors());

app.use("/", router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
