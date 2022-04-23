import "dotenv/config";

import fs from "fs";
import https from "https";
import express from "express";
import errorHandler from "errorhandler";
import swaggerUi from "swagger-ui-express";

import { config } from "./config";
import { appRouters } from "./routers";
import { PostgresDatabase } from "./db";
import { CERT_DIR, PORT, DEV_PORT } from "./variables";

import { IDatabase } from "./db/types";
import { CONNECTION_STRING } from "./variables";
import { addDatabaseToRequest } from "./middleware";
import docs from "../docs/openapi/OverfitterAPI.json";

// Init
const app = express();
const db: IDatabase = new PostgresDatabase(CONNECTION_STRING || "");

// Set up config
app.use(config);
app.use(addDatabaseToRequest(db));

// Set up routes
appRouters.forEach((appRouter) => {
    app.use(appRouter.endpoint, appRouter.router);
});

// Add Swagger docs
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(docs));

if (app.get("env") === "development") {
    app.use(errorHandler());
    app.listen(DEV_PORT);
    console.log(`Running a DEV API server at http://localhost:${DEV_PORT}`); // eslint-disable-line
} else {
    const key = fs.readFileSync(`${CERT_DIR}/privkey.pem`);
    const cert = fs.readFileSync(`${CERT_DIR}/cert.pem`);
    const options = {
        key: key,
        cert: cert
    };
    const server = https.createServer(options, app);
    server.listen(PORT, () => {
        console.log("Server starting on port: " + PORT); // eslint-disable-line
    });
}
