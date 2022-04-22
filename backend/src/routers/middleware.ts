import jwt from "jsonwebtoken";
import { NextFunction, Response as ExpressResponse } from "express";
import { body, param, query, validationResult } from "express-validator";

import { TOKEN_SECRET } from "../variables";
import { Response, StatusCode } from "../types";

export const authenticateToken = (
    req: any,
    res: ExpressResponse,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

export const ensureQueryContains = async (
    req: any,
    res: ExpressResponse,
    next: NextFunction,
    queryParams: string[]
) => {
    const query = req.query;
    let missingQueryParams: string[] = [];
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

export const ensureQueryContainsConstructor = (queryParams: string[]) => {
    return (req: any, res: ExpressResponse, next: NextFunction) =>
        ensureQueryContains(req, res, next, queryParams);
};

export const ensureValidInput = (
    req: any,
    res: ExpressResponse,
    next: NextFunction
) => {
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
