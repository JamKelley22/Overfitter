import express from "express";
// import escape from "escape-html";

import { TokenResponse } from "./types";
import { TOKEN_SECRET } from "../../variables";
import { generateAccessToken } from "./controller";
import { Response, StatusCode } from "../../types";

const router = express.Router();

/**
 * Sign In user and get auth token back
 */
const signInUserEndpoint = ``;
router.post(signInUserEndpoint, async (req, res) => {
    // if (!req.headers.authorization) {
    //     const error = "Must pass user/pass as basic auth";
    //     const statusCode = StatusCode.UNAUTHORIZED;
    //     res.statusCode = statusCode;
    //     res.json(new Response(false, undefined, statusCode, error));
    //     return;
    // }

    // const authorization = escape(req.headers.authorization);

    let response;
    try {
        // const base64Credentials = authorization.split(" ")[1];
        // const credentials = Buffer.from(base64Credentials, "base64").toString(
        //     "utf8"
        // );
        // const [login, password] = credentials.split(":");

        const tokenResponse = generateAccessToken("", TOKEN_SECRET as string);

        if (!tokenResponse) {
            const error = "Failed to generate token";
            const statusCode = StatusCode.SERVER_ERROR;
            res.statusCode = statusCode;
            res.json(new Response(false, null, statusCode, error));
            return;
        }

        response = new Response<TokenResponse>(true, tokenResponse);
    } catch (error) {
        response = new Response(
            false,
            null,
            500,
            "Server error when signing in user",
            error
        );
    }

    res.statusCode = response.statusCode;
    res.json(response.toObject());
});

const baseEndpoint = "/auth";
export { router, baseEndpoint };
