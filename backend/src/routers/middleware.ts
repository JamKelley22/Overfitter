import jwt from "jsonwebtoken";
import {
    NextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse
} from "express";
import { param, validationResult } from "express-validator";

import { TOKEN_SECRET } from "../variables";
import { Response, StatusCode } from "../types";

export const authenticateToken = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
): ExpressResponse | undefined => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, TOKEN_SECRET as string, (err) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
    });
};

export const ensureQueryContains = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction,
    queryParams: string[]
): Response<null> | undefined => {
    const query = req.query;
    const missingQueryParams: string[] = [];
    queryParams.forEach((queryParam) => {
        const queryParamExists = typeof query[queryParam] === "string";
        if (!queryParamExists) {
            missingQueryParams.push(queryParam as string);
        }
    });

    if (missingQueryParams.length > 0) {
        const response = new Response(
            false,
            null,
            StatusCode.BAD_REQUEST,
            "Missing query params: " + missingQueryParams.join(",")
        );
        res.statusCode = response.statusCode;
        res.json(response);
        return;
    }
    next();
};

// export const ensureQueryContainsConstructor = (queryParams: string[]) => {
//     return (req: ExpressRequest, res: ExpressResponse, next: NextFunction) =>
//         ensureQueryContains(req, res, next, queryParams);
// };

export const ensureValidInput = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
): ExpressResponse | undefined => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const idParamValidator = param("id")
    .not()
    .isEmpty()
    .escape()
    .trim()
    .toInt();
