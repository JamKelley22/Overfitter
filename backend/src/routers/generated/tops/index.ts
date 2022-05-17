import express, {
    Request as ExpressRequest,
    Response as ExpressResponse
} from "express";
import { checkSchema, matchedData, param } from "express-validator";

import { Response, StatusCode } from "../../../types";
import { cleanObject, parseIdFromParams } from "../../../util";
import { Validators, authenticateToken } from "../../../middleware";

import { ITop, Top } from "./types";

const router = express.Router();
router.use(authenticateToken);

const { ClothingItemValidationSchema, ensureValidInput } = Validators;

router.get(``, async (req: ExpressRequest, res: ExpressResponse) => {
    let response: Response<ITop[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.getAll("tops", Top);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when getting all top items",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.get(
    `/:id`, 
    param("id").escape().trim(),
    ensureValidInput,
    async (req: ExpressRequest, res: ExpressResponse) => {
        let response: Response<ITop | undefined>;
        const matchedParams = matchedData(req, {
            includeOptionals: false,
            locations: ["params"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const id = parseIdFromParams(matchedParams);
            response = await req.db.getById("tops", id, Top);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when getting top item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

router.post(
    ``,
    checkSchema(ClothingItemValidationSchema("CREATE")),
    ensureValidInput,
    async (req: ExpressRequest, res: ExpressResponse) => {
        let response: Response<ITop | undefined>;
        const matchedBody = matchedData(req, {
            includeOptionals: false,
            locations: ["body"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const item = new Top(cleanObject(matchedBody));
            response = await req.db.create("tops", item, Top);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when creating top item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

router.delete(``, async (req: ExpressRequest, res: ExpressResponse) => {
    let response: Response<ITop[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.deleteAll("tops", Top);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when deleting all top items",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.post(
    `/search`,
    checkSchema(ClothingItemValidationSchema("SEARCH")),
    ensureValidInput,
    async (req: ExpressRequest, res: ExpressResponse) => {
        let response: Response<ITop[] | undefined>;
        const matchedBody = matchedData(req, {
            includeOptionals: false,
            locations: ["body"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            response = await req.db.getAll(
                "tops",
                Top,
                cleanObject(matchedBody)
            );
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when searching for top item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

router.delete(
    `/:id`, 
    param("id").escape().trim(),
    ensureValidInput,
    async (req: ExpressRequest, res: ExpressResponse) => {
        let response: Response<ITop | undefined>;
        const matchedParams = matchedData(req, {
            includeOptionals: false,
            locations: ["params"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const id = parseIdFromParams(matchedParams);
            response = await req.db.deleteById("tops", id, Top);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when deleting top item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

router.put(
    `/:id`, 
    param("id").escape().trim(),
    checkSchema(ClothingItemValidationSchema("UPDATE")),
    ensureValidInput,
    async (req: ExpressRequest, res: ExpressResponse) => {
        let response: Response<ITop | undefined>;
        const matchedParams = matchedData(req, {
            includeOptionals: false,
            locations: ["params"]
        });
        const matchedBody = matchedData(req, {
            includeOptionals: false,
            locations: ["body"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const id = parseIdFromParams(matchedParams);
            const item = cleanObject(matchedBody);
            response = await req.db.updateById(
                "tops",
                id,
                item as Partial<Top>,
                Top
            );
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when updating top item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

const baseEndpoint = "/tops";
export { router, baseEndpoint };
