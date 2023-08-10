import { IDatabase } from "../../src/db/types"; // eslint-disable-line

declare global {
    declare namespace Express {
        export interface Request {
            db?: IDatabase;
        }
    }
}
