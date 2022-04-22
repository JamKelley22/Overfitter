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

import { IHead, Head } from "./types";

const router = express.Router();
router.use(authenticateToken);

router.get(``, async (req, res) => {
    let response: Response<IHead[] | undefined>;
    try {
        response = await getAll("heads", Head);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when getting all head items",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.get(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IHead | undefined>;
    try {
        const id = parseIdFromParams(req.params);
        response = await getById("heads", id, Head);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when getting head item",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.post(``, async (req, res) => {
    let response: Response<IHead | undefined>;
    try {
        const item = new Head(cleanObject(req.body));
        response = await create("heads", item, Head);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when creating head item",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.delete(``, async (req, res) => {
    let response: Response<IHead[] | undefined>;
    try {
        response = await deleteAll("heads", Head);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when deleting all head items",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.delete(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IHead | undefined>;
    try {
        const id = parseIdFromParams(req.params);
        response = await deleteById("heads", id, Head);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when deleting head item",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

router.put(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IHead | undefined>;
    try {
        const id = parseIdFromParams(req.params);
        const item = cleanObject(req.body);
        response = await updateById("heads", id, item as Partial<Head>, Head);
    } catch (e) {
        response = new Response(
            false,
            undefined,
            StatusCode.SERVER_ERROR,
            "Error when updating head item",
            e
        );
    }
    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

const baseEndpoint = "/heads";
export { router, baseEndpoint };
