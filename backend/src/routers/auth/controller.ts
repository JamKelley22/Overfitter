import jwt from "jsonwebtoken";

import { TokenResponse, TokenSign } from "./types";

const DefaultExpireTimeSeconds = 1800;

export const generateAccessToken = (
    uid: string,
    tokenSecret: string,
    expiresInSeconds: number = DefaultExpireTimeSeconds
): TokenResponse | null => {
    expiresInSeconds =
        expiresInSeconds > 0 ? expiresInSeconds : DefaultExpireTimeSeconds;

    const tokenSign: TokenSign = { uid: uid };
    const token = jwt.sign(tokenSign, tokenSecret, {
        expiresIn: `${expiresInSeconds}s`
    });

    return {
        token: token,
        expiresInSeconds: expiresInSeconds
    };
};
