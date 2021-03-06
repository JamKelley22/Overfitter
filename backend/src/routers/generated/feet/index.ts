import express, {
    Request as ExpressRequest,
    Response as ExpressResponse
} from "express";
import { checkSchema, matchedData, param } from "express-validator";

import { Response, StatusCode } from "../../../types";
import { cleanObject, parseIdFromParams } from "../../../util";
import { Validators, authenticateToken } from "../../../middleware";

import { IFeet, Feet } from "./types";

const router = express.Router();
router.use(authenticateToken);

const { ClothingItemValidationSchema, ensureValidInput } = Validators;

router.get(``, async (req: ExpressRequest, res: ExpressResponse) => {
    let response: Response<IFeet[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.getAll("feet", Feet);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when getting all feet items",
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
        let response: Response<IFeet | undefined>;
        const matchedParams = matchedData(req, {
            includeOptionals: false,
            locations: ["params"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const id = parseIdFromParams(matchedParams);
            response = await req.db.getById("feet", id, Feet);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when getting feet item",
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
        let response: Response<IFeet | undefined>;
        const matchedBody = matchedData(req, {
            includeOptionals: false,
            locations: ["body"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const item = new Feet(cleanObject(matchedBody));
            response = await req.db.create("feet", item, Feet);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when creating feet item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

router.delete(``, async (req: ExpressRequest, res: ExpressResponse) => {
    let response: Response<IFeet[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.deleteAll("feet", Feet);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when deleting all feet items",
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
        let response: Response<IFeet[] | undefined>;
        const matchedBody = matchedData(req, {
            includeOptionals: false,
            locations: ["body"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            response = await req.db.getAll(
                "feet",
                Feet,
                cleanObject(matchedBody)
            );
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when searching for feet item",
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
        let response: Response<IFeet | undefined>;
        const matchedParams = matchedData(req, {
            includeOptionals: false,
            locations: ["params"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const id = parseIdFromParams(matchedParams);
            response = await req.db.deleteById("feet", id, Feet);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when deleting feet item",
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
        let response: Response<IFeet | undefined>;
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
                "feet",
                id,
                item as Partial<Feet>,
                Feet
            );
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when updating feet item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

const baseEndpoint = "/feet";
export { router, baseEndpoint };
