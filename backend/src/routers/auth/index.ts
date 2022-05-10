// import axios from "axios";
import express from "express";
// import escape from "escape-html";
import { TokenResponse } from "./types";
import { TOKEN_SECRET } from "../../variables";
import { generateAccessToken } from "./controller";
import { Response, StatusCode } from "../../types";
// import {
//     AUDIENCE,
//     CLIENT_ID,
//     GRANT_TYPE,
//     CLIENT_SECRET
// } from "../../variables";

const router = express.Router();

/**
 * Get auth token back
 */
const getAuthTokenEndpoint = ``;
router.post(getAuthTokenEndpoint, async (req, res) => {
    if (!req.headers.authorization) {
        const error = "Must pass user/pass as basic auth";
        const statusCode = StatusCode.UNAUTHORIZED;
        res.statusCode = statusCode;
        res.json(new Response(false, undefined, statusCode, error));
        return;
    }

    // const authorization = escape(req.headers.authorization);
    let response;
    try {
        // const getTokenResponse = await axios.post(
        //     "https://jkelley.us.auth0.com/oauth/token",
        //     {
        //         client_id: CLIENT_ID,
        //         client_secret: CLIENT_SECRET,
        //         audience: AUDIENCE,
        //         grant_type: GRANT_TYPE
        //     }
        // );

        // response = new Response(true, getTokenResponse.data);
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
