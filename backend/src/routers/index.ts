import { router as auth, baseEndpoint as authEndpoint } from "./auth";
import {
    router as accessories,
    baseEndpoint as accessoriesEndpoint
} from "./generated/accessories";
import {
    router as bottoms,
    baseEndpoint as bottomsEndpoint
} from "./generated/bottoms";
import { router as feet, baseEndpoint as feetEndpoint } from "./generated/feet";
import {
    router as heads,
    baseEndpoint as headsEndpoint
} from "./generated/heads";
import {
    router as outfits,
    baseEndpoint as outfitsEndpoint
} from "./generated/outfits";
import { router as tops, baseEndpoint as topsEndpoint } from "./generated/tops";
import {
    router as wrists,
    baseEndpoint as wristsEndpoint
} from "./generated/wrists";

export const appRouters = [
    {
        router: auth,
        endpoint: authEndpoint
    },
    {
        router: accessories,
        endpoint: accessoriesEndpoint
    },
    {
        router: bottoms,
        endpoint: bottomsEndpoint
    },
    {
        router: feet,
        endpoint: feetEndpoint
    },
    {
        router: heads,
        endpoint: headsEndpoint
    },
    {
        router: outfits,
        endpoint: outfitsEndpoint
    },
    {
        router: tops,
        endpoint: topsEndpoint
    },
    {
        router: wrists,
        endpoint: wristsEndpoint
    }
];
