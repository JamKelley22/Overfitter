import { IDatabase } from "../../src/db/types";

declare global {
    declare namespace Express {
        export interface Request {
            db?: IDatabase;
        }
    }
}
