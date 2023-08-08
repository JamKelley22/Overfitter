// import jwks from "jwks-rsa";
import jwt from "jsonwebtoken";
// import { expressjwt as jwt } from "express-jwt";
import {
    NextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse
} from "express";
// import { auth } from "express-oauth2-jwt-bearer";

import { IDatabase } from "../db/types";
import { TOKEN_SECRET } from "../variables";
import * as Validators from "./validators";
import { StatusCode } from "../types";

const addDatabaseToRequestInternal = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction,
    db: IDatabase
): void => {
    req.db = db;
    next();
};

export const addDatabaseToRequest = (
    db: IDatabase
): ((
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
) => void) => (req: ExpressRequest, res: ExpressResponse, next: NextFunction) =>
    addDatabaseToRequestInternal(req, res, next, db);

export const authenticateToken = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
): ExpressResponse | void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(StatusCode.UNAUTHORIZED);

    jwt.verify(token, TOKEN_SECRET as string, (err) => {
        if (err) {
            return res.sendStatus(StatusCode.FORBIDDEN);
        }
        next();
    });
};

// export const authenticateToken = auth({
//     audience: "https://overfitter.jamkelley.com/api",
//     issuerBaseURL: `https://jkelley.us.auth0.com/`
// });

// export const authenticateToken = jwt({
//     secret: jwks.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: "https://jkelley.us.auth0.com/.well-known/jwks.json"
//     }),
//     audience: "https://overfitter.jamkelley.com/api",
//     issuer: "https://jkelley.us.auth0.com/",
//     algorithms: ["RS256"]
// });

export { Validators };
