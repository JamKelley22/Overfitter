require("dotenv").config(); // eslint-disable-line

import fs from "fs";
import https from "https";
import express from "express";
import errorHandler from "errorhandler";

import * as Const from "./variables";
import { appRouters } from "./routers";
import { config, pgClient } from "./config";

import docs from "../docs/OverfitterAPI.json";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(config);

appRouters.forEach((appRouter) => {
    app.use(appRouter.endpoint, appRouter.router);
});

// Add Swagger docs
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(docs));
app.use("/api", swaggerUi.serve, swaggerUi.setup(docs));

if (app.get("env") === "development") {
    const DEV_PORT = 4000;
    app.use(errorHandler());
    app.listen(DEV_PORT);
    console.log(`Running a DEV API server at http://localhost:${DEV_PORT}`); // eslint-disable-line
} else {
    const key = fs.readFileSync(`${Const.CERT_DIR}/privkey.pem`);
    const cert = fs.readFileSync(`${Const.CERT_DIR}/cert.pem`);
    const options = {
        key: key,
        cert: cert
    };
    const server = https.createServer(options, app);
    server.listen(Const.PORT, () => {
        console.log("Server starting on port: " + Const.PORT); // eslint-disable-line
    });
}

pgClient.connect(function (err: unknown) {
    if (err) throw err;
    console.log("Connected!"); // eslint-disable-line
});
