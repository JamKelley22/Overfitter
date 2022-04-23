import express from "express";

import {
    idParamValidator,
    ensureValidInput,
    authenticateToken,
} from "../../middleware";
import { Response, StatusCode } from "../../types";
import { cleanObject, parseIdFromParams } from "../../util";

import { IFeet, Feet } from "./types";

const router = express.Router();
router.use(authenticateToken);

router.get(``, async (req, res) => {
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

router.get(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IFeet | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
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
});

router.post(``, async (req, res) => {
    let response: Response<IFeet | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const item = new Feet(cleanObject(req.body));
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
});

router.delete(``, async (req, res) => {
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

router.delete(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IFeet | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
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
});

router.put(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IFeet | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
        const item = cleanObject(req.body);
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
});

const baseEndpoint = "/feet";
export { router, baseEndpoint };
