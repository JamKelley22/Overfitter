import express, {
    Request as ExpressRequest,
    Response as ExpressResponse
} from "express";
import { checkSchema, matchedData, param } from "express-validator";

import { Response, StatusCode } from "../../../types";
import { cleanObject, parseIdFromParams } from "../../../util";
import { Validators, authenticateToken } from "../../../middleware";

import { IOutfit, Outfit } from "./types";

const router = express.Router();
router.use(authenticateToken);

const { EntityValidationSchema, ensureValidInput } = Validators;

router.get(``, async (req: ExpressRequest, res: ExpressResponse) => {
    let response: Response<IOutfit[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.getAll("outfits", Outfit);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when getting all outfit items",
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
        let response: Response<IOutfit | undefined>;
        const matchedParams = matchedData(req, {
            includeOptionals: false,
            locations: ["params"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const id = parseIdFromParams(matchedParams);
            response = await req.db.getById("outfits", id, Outfit);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when getting outfit item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

router.post(
    ``,
    checkSchema(EntityValidationSchema("CREATE")),
    ensureValidInput,
    async (req: ExpressRequest, res: ExpressResponse) => {
        let response: Response<IOutfit | undefined>;
        const matchedBody = matchedData(req, {
            includeOptionals: false,
            locations: ["body"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const item = new Outfit(cleanObject(matchedBody));
            response = await req.db.create("outfits", item, Outfit);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when creating outfit item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

router.delete(``, async (req: ExpressRequest, res: ExpressResponse) => {
    let response: Response<IOutfit[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.deleteAll("outfits", Outfit);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when deleting all outfit items",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.post(
    `/search`,
    checkSchema(EntityValidationSchema("SEARCH")),
    ensureValidInput,
    async (req: ExpressRequest, res: ExpressResponse) => {
        let response: Response<IOutfit[] | undefined>;
        const matchedBody = matchedData(req, {
            includeOptionals: false,
            locations: ["body"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            response = await req.db.getAll(
                "outfits",
                Outfit,
                cleanObject(matchedBody)
            );
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when searching for outfit item",
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
        let response: Response<IOutfit | undefined>;
        const matchedParams = matchedData(req, {
            includeOptionals: false,
            locations: ["params"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const id = parseIdFromParams(matchedParams);
            response = await req.db.deleteById("outfits", id, Outfit);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when deleting outfit item",
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
    checkSchema(EntityValidationSchema("UPDATE")),
    ensureValidInput,
    async (req: ExpressRequest, res: ExpressResponse) => {
        let response: Response<IOutfit | undefined>;
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
                "outfits",
                id,
                item as Partial<Outfit>,
                Outfit
            );
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when updating outfit item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

const baseEndpoint = "/outfits";
export { router, baseEndpoint };
