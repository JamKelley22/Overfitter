import express, {
    Request as ExpressRequest,
    Response as ExpressResponse
} from "express";
import { checkSchema, matchedData, param } from "express-validator";

import { Response, StatusCode } from "../../../types";
import { cleanObject, parseIdFromParams } from "../../../util";
import { Validators, authenticateToken } from "../../../middleware";

import { IWrist, Wrist } from "./types";

const router = express.Router();
router.use(authenticateToken);

const { ClothingItemValidationSchema, ensureValidInput } = Validators;

router.get(``, async (req: ExpressRequest, res: ExpressResponse) => {
    let response: Response<IWrist[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.getAll("wrists", Wrist);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when getting all wrist items",
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
        let response: Response<IWrist | undefined>;
        const matchedParams = matchedData(req, {
            includeOptionals: false,
            locations: ["params"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const id = parseIdFromParams(matchedParams);
            response = await req.db.getById("wrists", id, Wrist);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when getting wrist item",
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
        let response: Response<IWrist | undefined>;
        const matchedBody = matchedData(req, {
            includeOptionals: false,
            locations: ["body"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const item = new Wrist(cleanObject(matchedBody));
            response = await req.db.create("wrists", item, Wrist);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when creating wrist item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

router.delete(``, async (req: ExpressRequest, res: ExpressResponse) => {
    let response: Response<IWrist[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.deleteAll("wrists", Wrist);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when deleting all wrist items",
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
        let response: Response<IWrist[] | undefined>;
        const matchedBody = matchedData(req, {
            includeOptionals: false,
            locations: ["body"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            response = await req.db.getAll(
                "wrists",
                Wrist,
                cleanObject(matchedBody)
            );
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when deleting all wrist items",
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
        let response: Response<IWrist | undefined>;
        const matchedParams = matchedData(req, {
            includeOptionals: false,
            locations: ["params"]
        });
        try {
            if (!req.db) throw new Error("No database to query");
            const id = parseIdFromParams(matchedParams);
            response = await req.db.deleteById("wrists", id, Wrist);
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when deleting wrist item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

router.put(
    `/:id`,
    checkSchema(ClothingItemValidationSchema("UPDATE")),
    ensureValidInput,
    async (req: ExpressRequest, res: ExpressResponse) => {
        let response: Response<IWrist | undefined>;
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
                "wrists",
                id,
                item as Partial<Wrist>,
                Wrist
            );
        } catch (e) {
            response = new Response(
                false,
                undefined,
                StatusCode.SERVER_ERROR,
                "Error when updating wrist item",
                e
            );
        }
        res.statusCode = response.statusCode;
        res.json(response.toObject());
    }
);

const baseEndpoint = "/wrists";
export { router, baseEndpoint };
