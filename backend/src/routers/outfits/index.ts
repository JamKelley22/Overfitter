import express from "express";

import {
    idParamValidator,
    ensureValidInput,
    authenticateToken,
} from "../../middleware";
import { Response, StatusCode } from "../../types";
import { cleanObject, parseIdFromParams } from "../../util";

import { IOutfit, Outfit } from "./types";

const router = express.Router();
router.use(authenticateToken);

router.get(``, async (req, res) => {
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

router.get(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IOutfit | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
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
});

router.post(``, async (req, res) => {
    let response: Response<IOutfit | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const item = new Outfit(cleanObject(req.body));
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
});

router.delete(``, async (req, res) => {
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

router.delete(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IOutfit | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
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
});

router.put(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IOutfit | undefined>;
    try {
        if (!req.db) throw new Error("No database to query");
        const id = parseIdFromParams(req.params);
        const item = cleanObject(req.body);
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
});

const baseEndpoint = "/outfits";
export { router, baseEndpoint };
