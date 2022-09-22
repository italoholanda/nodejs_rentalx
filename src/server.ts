import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerOptions from "./swagger.json";

import "./database";
import "./shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(router);

app.listen(3333, () => console.log("\nSERVER RUNNING ...\n"));
