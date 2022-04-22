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

import { IWrist, Wrist } from "./types";

const router = express.Router();
router.use(authenticateToken);

router.get(``, async (req, res) => {
    let response: Response<IWrist[] | undefined>;
    try {
        response = await getAll("wrists", Wrist);
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

router.get(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IWrist | undefined>;
    try {
        const id = parseIdFromParams(req.params);
        response = await getById("wrists", id, Wrist);
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
});

router.post(``, async (req, res) => {
    let response: Response<IWrist | undefined>;
    try {
        const item = new Wrist(cleanObject(req.body));
        response = await create("wrists", item, Wrist);
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
});

router.delete(``, async (req, res) => {
    let response: Response<IWrist[] | undefined>;
    try {
        response = await deleteAll("wrists", Wrist);
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

router.delete(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IWrist | undefined>;
    try {
        const id = parseIdFromParams(req.params);
        response = await deleteById("wrists", id, Wrist);
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
});

router.put(`/:id`, idParamValidator, ensureValidInput, async (req, res) => {
    let response: Response<IWrist | undefined>;
    try {
        const id = parseIdFromParams(req.params);
        const item = cleanObject(req.body);
        response = await updateById(
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
});

const baseEndpoint = "/wrists";
export { router, baseEndpoint };
