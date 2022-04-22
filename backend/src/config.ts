import cors from "cors";
import helmet from "helmet";
import express from "express";
import { Client } from "pg";
import { CONNECTION_STRING } from "./variables";

const app = express();

const pgClient = new Client({ connectionString: CONNECTION_STRING });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());

export { app as config, pgClient };
