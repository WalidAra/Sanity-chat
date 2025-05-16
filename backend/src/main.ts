import "module-alias/register";

console.clear();

import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { config } from "@/config";
import { api } from "@/api";
import socketInitializer from "./socket";
import { createServer } from "node:http";
import express, { Express, Request, Response } from "express";
import chalk from "chalk";

const swaggerDocument = YAML.load("./swagger.yaml");
const app: Express = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});
app.use("/api", api);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

socketInitializer(httpServer);

httpServer.listen(config.port, () => {
  console.log("\n====================================");
  console.log(chalk.blue(`\n- Server running on port:`), config.port);
  console.log(chalk.red(`~> http://localhost:${config.port}`));
  console.log(chalk.blackBright(`~> http://localhost:${config.port}/docs`));
  console.log("\n====================================");
});
