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

import { IBottom, Bottom } from "./types";

const router = express.Router();
router.use(authenticateToken);

router.get(``, async (req, res) => {
    let response: Response<IBottom[] | undefined>;
    try {
        response = await getAll("bottoms", Bottom);
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
        const id = parseIdFromParams(req.params);
        response = await getById("bottoms", id, Bottom);
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
        const item = new Bottom(cleanObject(req.body));
        response = await create("bottoms", item, Bottom);
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
        response = await deleteAll("bottoms", Bottom);
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
        const id = parseIdFromParams(req.params);
        response = await deleteById("bottoms", id, Bottom);
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
        const id = parseIdFromParams(req.params);
        const item = new Bottom(cleanObject(req.body));
        response = await updateById("bottoms", id, item, Bottom);
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
