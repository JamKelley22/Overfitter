import express from "express";

import {
    getAll,
    getById,
    create,
    deleteAll,
    deleteById,
    updateById
} from "../../engine";
import {
    idParamValidator,
    ensureValidInput,
    authenticateToken
} from "../middleware";
import { Response, StatusCode } from "../../types";
import { cleanObject, parseIdFromParams } from "../../util";

import { ITop, Top } from "./types";

const router = express.Router();
router.use(authenticateToken);

router.get(``, async (req, res) => {
    let response: Response<ITop[] | undefined>;
    try {
        response = await getAll("tops", Top);
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

router.get(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<ITop | undefined>;
    try {
        const id = parseIdFromParams(req.params);
        response = await getById("tops", id, Top);
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
});

router.post(``, async (req, res) => {
    let response: Response<ITop | undefined>;
    try {
        const item = new Top(cleanObject(req.body));
        response = await create("tops", item, Top);
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
});

router.delete(``, async (req, res) => {
    let response: Response<ITop[] | undefined>;
    try {
        response = await deleteAll("tops", Top);
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

router.delete(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<ITop | undefined>;
    try {
        const id = parseIdFromParams(req.params);
        response = await deleteById("tops", id, Top);
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
});

router.put(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<ITop | undefined>;
    try {
        const id = parseIdFromParams(req.params);
        const item = new Top(cleanObject(req.body));
        response = await updateById("tops", id, item, Top);
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
});

const baseEndpoint = "/tops";
export { router, baseEndpoint };
