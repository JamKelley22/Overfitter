import cors from "cors";
import helmet from "helmet";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());

export { app as config };
