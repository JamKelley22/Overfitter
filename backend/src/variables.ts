const { env } = process;

const envLoadError = (envVar: string) =>
    `Could not load ${envVar} env variable`;

//=====Env consts=====
export const PORT = process.env.PORT || 8080;
if (!PORT) throw new Error(envLoadError("PORT")); //Should never error but for consistency
export const DEV_PORT = process.env.PORT || 8080;
if (!DEV_PORT) throw new Error(envLoadError("DEV_PORT")); //Should never error but for consistency

export const CERT_DIR = env.CERT_DIR;
if (!CERT_DIR) throw new Error(envLoadError("CERT_DIR"));

export const TOKEN_SECRET = env.TOKEN_SECRET;
if (!TOKEN_SECRET) throw new Error(envLoadError("TOKEN_SECRET"));

export const CONNECTION_STRING = env.CONNECTION_STRING;
if (!CONNECTION_STRING) throw new Error(envLoadError("CONNECTION_STRING"));
