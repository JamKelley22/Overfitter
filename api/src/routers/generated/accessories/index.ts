import express, {
    Request as ExpressRequest,
    Response as ExpressResponse
} from "express";
import { checkSchema, matchedData, param } from "express-validator";

import { Response, StatusCode } from "../../../types";
import { cleanObject, parseIdFromParams } from "../../../util";
import { Validators, authenticateToken } from "../../../middleware";

import { IAccessory, Accessory } from "./types";

const router = express.Router();
router.use(authenticateToken);

const { ClothingItemValidationSchema, ensureValidInput } = Validators;

router.get(``, async (req: ExpressRequest, res: ExpressResponse) => {
    let response: Response<IAccessory[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.getAll("accessories", Accessory);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when getting all accessory items",
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
        let response: Response<IAccessory | undefined>;
        const matchedParams = matchedData(req, {
            includeOptionals: false,
            locations: ["params"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const id = parseIdFromParams(matchedParams);
            response = await req.db.getById("accessories", id, Accessory);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when getting accessory item",
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
        let response: Response<IAccessory | undefined>;
        const matchedBody = matchedData(req, {
            includeOptionals: false,
            locations: ["body"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const item = new Accessory(cleanObject(matchedBody));
            response = await req.db.create("accessories", item, Accessory);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when creating accessory item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

router.delete(``, async (req: ExpressRequest, res: ExpressResponse) => {
    let response: Response<IAccessory[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.deleteAll("accessories", Accessory);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when deleting all accessory items",
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
        let response: Response<IAccessory[] | undefined>;
        const matchedBody = matchedData(req, {
            includeOptionals: false,
            locations: ["body"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            response = await req.db.getAll(
                "accessories",
                Accessory,
                cleanObject(matchedBody)
            );
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when searching for accessory item",
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
        let response: Response<IAccessory | undefined>;
        const matchedParams = matchedData(req, {
            includeOptionals: false,
            locations: ["params"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const id = parseIdFromParams(matchedParams);
            response = await req.db.deleteById("accessories", id, Accessory);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when deleting accessory item",
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
        let response: Response<IAccessory | undefined>;
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
                "accessories",
                id,
                item as Partial<Accessory>,
                Accessory
            );
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when updating accessory item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

const baseEndpoint = "/accessories";
export { router, baseEndpoint };
