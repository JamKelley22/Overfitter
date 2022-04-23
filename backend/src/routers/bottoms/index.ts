import express from "express";

import {
    idParamValidator,
    ensureValidInput,
    authenticateToken,
} from "../../middleware";
import { Response, StatusCode } from "../../types";
import { cleanObject, parseIdFromParams } from "../../util";

import { IBottom, Bottom } from "./types";

const router = express.Router();
router.use(authenticateToken);

router.get(``, async (req, res) => {
    let response: Response<IBottom[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.getAll("bottoms", Bottom);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when getting all bottom items",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.get(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IBottom | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
        response = await req.db.getById("bottoms", id, Bottom);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when getting bottom item",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.post(``, async (req, res) => {
    let response: Response<IBottom | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const item = new Bottom(cleanObject(req.body));
        response = await req.db.create("bottoms", item, Bottom);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when creating bottom item",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.delete(``, async (req, res) => {
    let response: Response<IBottom[] | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        response = await req.db.deleteAll("bottoms", Bottom);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when deleting all bottom items",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.delete(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IBottom | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
        response = await req.db.deleteById("bottoms", id, Bottom);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when deleting bottom item",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.put(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IBottom | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
        const item = cleanObject(req.body);
        response = await req.db.updateById(
            "bottoms",
            id,
            item as Partial<Bottom>,
            Bottom
        );
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when updating bottom item",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

const baseEndpoint = "/bottoms";
export { router, baseEndpoint };
