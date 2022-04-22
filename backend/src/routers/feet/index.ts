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

import { IFeet, Feet } from "./types";

const router = express.Router();
router.use(authenticateToken);

router.get(``, async (req, res) => {
    let response: Response<IFeet[] | undefined>;
    try {
        response = await getAll("feet", Feet);
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
        const id = parseIdFromParams(req.params);
        response = await getById("feet", id, Feet);
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
        const item = new Feet(cleanObject(req.body));
        response = await create("feet", item, Feet);
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
        response = await deleteAll("feet", Feet);
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
        const id = parseIdFromParams(req.params);
        response = await deleteById("feet", id, Feet);
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
        const id = parseIdFromParams(req.params);
        const item = cleanObject(req.body);
        response = await updateById("feet", id, item as Partial<Feet>, Feet);
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
