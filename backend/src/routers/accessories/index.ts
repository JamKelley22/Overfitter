import express from "express";

import {
    idParamValidator,
    ensureValidInput,
    authenticateToken,
} from "../../middleware";
import { Response, StatusCode } from "../../types";
import { cleanObject, parseIdFromParams } from "../../util";

import { IAccessory, Accessory } from "./types";

const router = express.Router();
router.use(authenticateToken);

router.get(``, async (req, res) => {
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

router.get(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IAccessory | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
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
});

router.post(``, async (req, res) => {
    let response: Response<IAccessory | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const item = new Accessory(cleanObject(req.body));
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
});

router.delete(``, async (req, res) => {
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

router.delete(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IAccessory | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
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
});

router.put(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IAccessory | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
        const item = cleanObject(req.body);
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
});

const baseEndpoint = "/accessories";
export { router, baseEndpoint };
